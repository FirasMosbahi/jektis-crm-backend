import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ClientRequest } from './client-request.schema';
import { RequestType } from '../enums/request-type';
import { SchemaTypes } from 'mongoose';

@Schema({ timestamps: true })
export class HotelReservationRequest extends ClientRequest {
  @Prop({
    type: SchemaTypes.Number,
    require: true,
    enum: RequestType,
    default: RequestType.HOTEL,
  })
  requestType: RequestType;
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  location: string;
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  hotelName: string;
  @Prop({
    type: SchemaTypes.Boolean,
    required: true,
  })
  isTunisianHotel: boolean;
  @Prop({
    type: SchemaTypes.Number,
    required: true,
  })
  numberOfChambres: number;
}

export const HotelReservationRequestSchema = SchemaFactory.createForClass(
  HotelReservationRequest,
);
