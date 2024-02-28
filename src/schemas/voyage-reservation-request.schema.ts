import { VoyageType } from '../enums/voyage-type';
import { ClientRequest } from './client-request.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { RequestType } from '../enums/request-type';

@Schema({ timestamps: true })
export class VoyageReservationRequest extends ClientRequest {
  @Prop({
    type: SchemaTypes.Number,
    require: true,
    enum: RequestType,
    default: RequestType.VOYAGE,
  })
  requestType: RequestType;

  @Prop({ type: SchemaTypes.String, required: true })
  destination: string;
  @Prop({ type: SchemaTypes.String, enum: VoyageType, required: true })
  type: VoyageType;
  @Prop({ type: SchemaTypes.Number, required: true })
  nombreDePlaces: number;
}

export const VoyageReservationRequestSchema = SchemaFactory.createForClass(
  VoyageReservationRequest,
);
