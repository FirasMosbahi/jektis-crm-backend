import { ClientRequestDto } from './request.dto';
import { IsBoolean, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateHotelReservationRequestDto extends ClientRequestDto {
  @IsString()
  location: string;
  @IsString()
  hotelName: string;
  @IsBoolean()
  isTunisianHotel: boolean;
  @IsNumber()
  @IsPositive()
  numberOfChambres: number;
}
