import { Module } from '@nestjs/common';
import { BilletController } from './billet.controller';
import { BilletService } from './billet.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import {
  BilletRequest,
  BilletRequestSchema,
} from '../schemas/billet-request.schema';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      {
        name: BilletRequest.name,
        schema: BilletRequestSchema,
        collection: 'client-request',
      },
    ]),
  ],
  controllers: [BilletController],
  providers: [BilletService],
})
export class BilletModule {}
