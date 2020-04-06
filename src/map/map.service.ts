import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

type Position = {
  lat: number;
  lng: number;
};

type Marker = {
  id: string;
  position: Position;
  text: string;
};

@Injectable()
export class MapService implements OnModuleInit, OnModuleDestroy {
  private currentMarkers: Marker[] = [
    {
      id: 'asd',
      position: { lat: 52.752351, lng: 23.183644 },
      text: 'Mateusz Stepaniuk',
    },
    {
      id: 'qweqwe',
      position: { lat: 52.769451, lng: 23.193644 },
      text: 'Wojeciech Michałowski',
    },
  ];
  private interval: NodeJS.Timer;

  public getCurrentMarkers(): Marker[] {
    return this.currentMarkers;
  }

  public onModuleInit() {
    this.interval = setInterval(() => {
      this.currentMarkers.forEach(marker => {
        marker.position.lat += (Math.random() * 2 - 1) / 10000;
        marker.position.lng += (Math.random() * 2 - 1) / 10000;
      });
    }, 200);
  }

  public onModuleDestroy() {
    clearInterval(this.interval);
  }
}
