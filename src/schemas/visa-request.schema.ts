import { ClientRequest } from './client-request.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { RequestType } from '../enums/request-type';

@Schema({ timestamps: true })
export class VisaRequest extends ClientRequest {
  @Prop({
    type: SchemaTypes.Number,
    require: true,
    enum: RequestType,
    default: RequestType.VISA,
  })
  requestType: RequestType;

  @Prop({ type: SchemaTypes.String, required: true })
  destination: string;
  @Prop({ type: SchemaTypes.String, required: true })
  duration: string;
  @Prop({ type: SchemaTypes.Date, required: true })
  startFrom: Date;
}

export const VisaRequestSchema = SchemaFactory.createForClass(VisaRequest);
