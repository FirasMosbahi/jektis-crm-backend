import { RequestType } from '../enums/request-type';
import { CreationMethod } from '../enums/creation-method';
import { RequestStatus } from '../enums/request-status';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Client } from './client.schema';
import { BaseSchema } from './base.schema';
import { SchemaTypes, Types } from 'mongoose';
import { Auth } from './auth.schema';

@Schema({ discriminatorKey: 'requestType', timestamps: true })
export class ClientRequest extends BaseSchema {
  @Prop({
    type: SchemaTypes.Number,
    require: true,
    enum: RequestType,
  })
  requestType: RequestType;
  @Prop({
    type: SchemaTypes.String,
    require: true,
  })
  title: string;
  @Prop({ required: true })
  client: Client;
  @Prop({
    type: SchemaTypes.String,
    require: true,
    enum: CreationMethod,
  })
  creationMethod: CreationMethod;
  @Prop({
    type: SchemaTypes.String,
    require: true,
  })
  description: string;
  @Prop({
    type: SchemaTypes.String,
    require: true,
    enum: RequestStatus,
    default: RequestStatus.NON_AFFECTED,
  })
  status: RequestStatus;
  @Prop({
    type: SchemaTypes.Date,
    require: true,
    default: new Date(),
  })
  createdAt: Date;
  @Prop({
    type: SchemaTypes.Date,
    require: false,
  })
  deadline?: Date;
  @Prop({
    type: SchemaTypes.Date,
    require: false,
  })
  closedAt?: Date;
  @Prop({ type: SchemaTypes.ObjectId, required: false, ref: Auth.name })
  agent?: Types.ObjectId;
}

export const ClientRequestSchema = SchemaFactory.createForClass(ClientRequest);
