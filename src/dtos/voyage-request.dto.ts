import { ClientRequestDto } from './request.dto';
import { VoyageType } from '../enums/voyage-type';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class VoyageReservationRequestDto extends ClientRequestDto {
  @IsString()
  destination: string;
  @IsEnum(VoyageType)
  type: VoyageType;
  @IsNumber()
  nombreDePlaces: number;
}
