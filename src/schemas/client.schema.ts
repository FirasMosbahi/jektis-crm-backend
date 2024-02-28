import { Prop } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';

export class Client {
  @Prop({
    type: SchemaTypes.String,
    required: true,
  })
  fullName: string;
  @Prop({
    type: SchemaTypes.String,
    required: false,
  })
  email?: string;
  @Prop({
    type: SchemaTypes.String,
    required: false,
  })
  facebook?: string;
  @Prop({
    type: SchemaTypes.String,
    required: false,
  })
  whatsApp?: string;
  @Prop({
    type: SchemaTypes.String,
    required: false,
  })
  phoneNumber?: string;
}
