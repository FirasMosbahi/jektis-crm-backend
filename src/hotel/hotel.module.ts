import { Module } from '@nestjs/common';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import {
  HotelReservationRequestSchema,
  HotelReservationRequest,
} from '../schemas/hotel-reservation-request.schema';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      {
        name: HotelReservationRequest.name,
        schema: HotelReservationRequestSchema,
        collection: 'client-request',
      },
    ]),
  ],
  controllers: [HotelController],
  providers: [HotelService],
})
export class HotelModule {}
