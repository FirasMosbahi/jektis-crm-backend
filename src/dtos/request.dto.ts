import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreationMethod } from '../enums/creation-method';
import { RequestStatus } from '../enums/request-status';
import { Type } from 'class-transformer';

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
  @ValidateNested()
  @Type(() => ClientDto)
  client: ClientDto;
  @IsEnum(CreationMethod)
  creationMethod: CreationMethod;
  @IsString()
  description: string;
  @IsOptional()
  deadline?: Date;
  @IsOptional()
  @IsDate()
  closedAt?: Date;
}

export class UpdateRequestStatusDto {
  @IsEnum(RequestStatus)
  status: RequestStatus;
}
