import { ClientRequest } from './client-request.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { RequestType } from '../enums/request-type';

@Schema({ timestamps: true })
export class BilletRequest extends ClientRequest {
  @Prop({
    type: SchemaTypes.Number,
    require: true,
    enum: RequestType,
    default: RequestType.BILLET,
  })
  requestType: RequestType;
  @Prop({ type: SchemaTypes.String, required: true })
  destination: string;
  @Prop({ type: SchemaTypes.Date, required: true })
  volDate: Date;
  @Prop({ type: SchemaTypes.Boolean, required: true })
  allowEscales: boolean;
  @Prop({ type: SchemaTypes.String, required: true })
  airline: string;
  @Prop({ type: SchemaTypes.Number, required: true })
  baggageWeight: number;
}

export const BilletRequestSchema = SchemaFactory.createForClass(BilletRequest);
