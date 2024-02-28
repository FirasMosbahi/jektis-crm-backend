import { Module } from '@nestjs/common';
import { VoyageRequestController } from './voyage-request.controller';
import { VoyageRequestService } from './voyage-request.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import {
  VoyageReservationRequest,
  VoyageReservationRequestSchema,
} from '../schemas/voyage-reservation-request.schema';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      {
        name: VoyageReservationRequest.name,
        schema: VoyageReservationRequestSchema,
        collection: 'client-request',
      },
    ]),
  ],
  controllers: [VoyageRequestController],
  providers: [VoyageRequestService],
})
export class VoyageRequestModule {}
