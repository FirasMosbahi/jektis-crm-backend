import { Injectable } from '@nestjs/common';
import { CommonRepository } from '../common/common.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateVisaRequestDto } from '../dtos/visa.dto';
import { VisaRequest } from '../schemas/visa-request.schema';
import { RequestType } from '../enums/request-type';

@Injectable()
export class VisaService extends CommonRepository<VisaRequest> {
  protected readonly modelName: string = VisaRequest.name;

  constructor(
    @InjectModel(VisaRequest.name)
    private readonly visaRequestModel: Model<VisaRequest>,
  ) {
    super(visaRequestModel);
  }

  async createVisaRequest(
    visaRequest: CreateVisaRequestDto,
  ): Promise<VisaRequest> {
    return await this.create(visaRequest);
  }
  async getVisaRequests(): Promise<VisaRequest[]> {
    const result = await this.find(
      { requestType: RequestType.VISA },
      undefined,
      { populate: 'agent' },
    );
    return result.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
  }
}
