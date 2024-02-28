import { ConflictException, Injectable } from '@nestjs/common';
import { CommonRepository } from '../common/common.repository';
import { ClientRequest } from '../schemas/client-request.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ClientRequestDto } from '../dtos/request.dto';
import { RequestStatus } from '../enums/request-status';
import { RequestType } from '../enums/request-type';

@Injectable()
export class ClientRequestService extends CommonRepository<ClientRequest> {
  protected readonly modelName: string = ClientRequest.name;

  constructor(
    @InjectModel(ClientRequest.name)
    private readonly clientRequestModel: Model<ClientRequest>,
  ) {
    super(clientRequestModel);
  }

  async createClientRequest(
    clientRequest: ClientRequestDto,
  ): Promise<ClientRequest> {
    return await this.create({
      ...clientRequest,
      requestType: RequestType.HOTEL,
    });
  }
  async getClientRequests(): Promise<ClientRequest[]> {
    const result = await this.find({}, undefined, { populate: 'agent' });
    return result.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1));
  }

  async assignToMe(agentId: Types.ObjectId, requestId: Types.ObjectId) {
    const request = await this.findById(requestId);
    if (request.agent) {
      throw new ConflictException('this request is already assigned');
    }
    return await this.findByIdAndUpdate(requestId, {
      $set: { agent: agentId, status: RequestStatus.AFFECTED },
    });
  }

  async updateStatus(
    requestId: Types.ObjectId,
    agentId: Types.ObjectId,
    status: RequestStatus,
  ) {
    return await this.findOneAndUpdate(
      { _id: requestId, agent: agentId },
      { $set: { status } },
    );
  }
}
