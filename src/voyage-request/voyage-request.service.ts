import { Injectable } from '@nestjs/common';
import { CommonRepository } from '../common/common.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VoyageReservationRequest } from '../schemas/voyage-reservation-request.schema';
import { VoyageReservationRequestDto } from '../dtos/voyage-request.dto';
import { RequestType } from '../enums/request-type';

@Injectable()
export class VoyageRequestService extends CommonRepository<VoyageReservationRequest> {
  protected readonly modelName: string = VoyageReservationRequest.name;

  constructor(
    @InjectModel(VoyageReservationRequest.name)
    private readonly voyageReservationRequestModel: Model<VoyageReservationRequest>,
  ) {
    super(voyageReservationRequestModel);
  }

  async createVoyageReservationRequest(
    voyageReservationRequestDto: VoyageReservationRequestDto,
  ): Promise<VoyageReservationRequest> {
    return await this.create(voyageReservationRequestDto);
  }
  async getVoyageReservationRequests(): Promise<VoyageReservationRequest[]> {
    const result = await this.find(
      { requestType: RequestType.VOYAGE },
      undefined,
      { populate: 'agent' },
    );
    return result.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
  }
}
