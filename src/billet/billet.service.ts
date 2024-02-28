import { Injectable } from '@nestjs/common';
import { CommonRepository } from '../common/common.repository';
import { BilletRequest } from '../schemas/billet-request.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BilletRequestDto } from '../dtos/billet.dto';
import { RequestType } from '../enums/request-type';

@Injectable()
export class BilletService extends CommonRepository<BilletRequest> {
  protected readonly modelName: string = BilletRequest.name;

  constructor(
    @InjectModel(BilletRequest.name)
    private readonly billetRequestModel: Model<BilletRequest>,
  ) {
    super(billetRequestModel);
  }

  async createBilletRequest(
    billetRequestDto: BilletRequestDto,
  ): Promise<BilletRequest> {
    return await this.create(billetRequestDto);
  }
  async getBilletRequests(): Promise<BilletRequest[]> {
    const result = await this.find(
      { requestType: RequestType.BILLET },
      undefined,
      { populate: 'agent' },
    );
    return result.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
  }
}
