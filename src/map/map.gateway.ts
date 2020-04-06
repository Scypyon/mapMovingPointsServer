import {
  WebSocketGateway,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MapService } from './map.service';

type Interval = {
  interval: NodeJS.Timer;
  id: string;
};

@WebSocketGateway(8081, { namespace: 'map' })
export class MapGateway implements OnGatewayConnection, OnGatewayDisconnect {
  runningIntervals: Interval[] = [];

  constructor(public mapService: MapService) {}

  public handleConnection(socket: Socket) {
    const interval = setInterval(() => {
      const markers = this.mapService.getCurrentMarkers();
      socket.emit('markers', markers);
    }, 1000);
    this.runningIntervals.push({ interval, id: socket.id });
  }

  public handleDisconnect(socket: Socket) {
    this.runningIntervals = this.runningIntervals.filter(({ interval, id }) => {
      if (id === socket.id) {
        clearInterval(interval);
        return false;
      } else {
        return true;
      }
    });
  }
}
