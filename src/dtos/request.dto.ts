import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { RequestType } from '../enums/request-type';
import { Client } from '../schemas/client.schema';
import { CreationMethod } from '../enums/creation-method';
import { RequestStatus } from '../enums/request-status';

export class ClientDto {
  @IsString()
  fullName: string;
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsString()
  facebook?: string;
  @IsOptional()
  @IsPhoneNumber()
  whatsApp?: string;
  @IsOptional()
  @IsPhoneNumber()
  phoneNumber?: string;
}

export class ClientRequestDto {
  // @IsEnum(RequestType)
  // requestType: RequestType;
  @IsString()
  title: string;
  client: Client;
  @IsEnum(CreationMethod)
  creationMethod: CreationMethod;
  @IsString()
  description: string;
  @IsEnum(RequestStatus)
  status: RequestStatus;
  @IsOptional()
  @IsDate()
  deadline?: Date;
  @IsOptional()
  @IsDate()
  closedAt?: Date;
}

export class UpdateRequestStatusDto {
  @IsEnum(RequestStatus)
  status: RequestStatus;
}
