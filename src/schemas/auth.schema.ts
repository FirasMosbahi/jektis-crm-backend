import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { BaseSchema } from './base.schema';

@Schema({ timestamps: true })
export class Auth extends BaseSchema {
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  email: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  password: string;

  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  name: string;

  @Prop({ type: SchemaTypes.Boolean, required: true })
  isAdmin: boolean;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
