import { IsDate, IsString } from 'class-validator';
import { ClientRequestDto } from './request.dto';

export class CreateVisaRequestDto extends ClientRequestDto {
  @IsString()
  destination: string;
  @IsString()
  duration: string;
  @IsDate()
  startFrom: Date;
}
