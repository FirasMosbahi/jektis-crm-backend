import { Module } from '@nestjs/common';
import { VisaController } from './visa.controller';
import { VisaService } from './visa.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { VisaRequest, VisaRequestSchema } from '../schemas/visa-request.schema';

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      {
        name: VisaRequest.name,
        schema: VisaRequestSchema,
        collection: 'client-request',
      },
    ]),
  ],
  controllers: [VisaController],
  providers: [VisaService],
})
export class VisaModule {}
