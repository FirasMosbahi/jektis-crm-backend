import { ClientRequestDto } from './request.dto';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';

export class BilletRequestDto extends ClientRequestDto {
  @IsString()
  destination: string;
  @IsDate()
  volDate: Date;
  @IsBoolean()
  allowEscales: boolean;
  @IsString()
  airline: string;
  @IsNumber()
  baggageWeight: number;
}
