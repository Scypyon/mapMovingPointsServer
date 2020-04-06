import { Module } from '@nestjs/common';
import { MapModule } from './map/map.module';

@Module({
  imports: [MapModule],
})
export class AppModule {}
