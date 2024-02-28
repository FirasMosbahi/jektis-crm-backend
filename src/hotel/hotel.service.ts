import { Injectable } from '@nestjs/common';
import { CommonRepository } from '../common/common.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateHotelReservationRequestDto } from '../dtos/hotel.dto';
import { HotelReservationRequest } from '../schemas/hotel-reservation-request.schema';
import { RequestType } from '../enums/request-type';

@Injectable()
export class HotelService extends CommonRepository<HotelReservationRequest> {
  protected readonly modelName: string = HotelReservationRequest.name;

  constructor(
    @InjectModel(HotelReservationRequest.name)
    private readonly hotelReservationRequestModel: Model<HotelReservationRequest>,
  ) {
    super(hotelReservationRequestModel);
  }

  async createHotelReservationRequest(
    hotelReservationRequest: CreateHotelReservationRequestDto,
  ): Promise<HotelReservationRequest> {
    return await this.create(hotelReservationRequest);
  }
  async getHotelReservationRequests(): Promise<HotelReservationRequest[]> {
    const result = await this.find(
      { requestType: RequestType.HOTEL },
      undefined,
      { populate: 'agent' },
    );
    return result.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
  }
}
