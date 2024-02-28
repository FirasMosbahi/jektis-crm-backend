import { Module } from '@nestjs/common';
import { ClientRequestController } from './client-request.controller';
import { ClientRequestService } from './client-request.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ClientRequest,
  ClientRequestSchema,
} from '../schemas/client-request.schema';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      {
        name: ClientRequest.name,
        schema: ClientRequestSchema,
        collection: 'client-request',
      },
    ]),
  ],
  controllers: [ClientRequestController],
  providers: [ClientRequestService],
})
export class ClientRequestModule {}
