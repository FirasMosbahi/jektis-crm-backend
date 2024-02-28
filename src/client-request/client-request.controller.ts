import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AgentGuard } from '../guards/agent.guard';
import { ClientRequestService } from './client-request.service';
import { AdminGuard } from '../guards/admin.guard';
import { ClientRequestDto, UpdateRequestStatusDto } from '../dtos/request.dto';
import { Types } from 'mongoose';

@Controller('client-request')
export class ClientRequestController {
  constructor(private readonly clientRequestService: ClientRequestService) {}
  @Get()
  @UseGuards(AgentGuard)
  async getRequests() {
    const data = await this.clientRequestService.getClientRequests();
    return {
      message: 'client requests fetched successfully',
      data,
    };
  }

  @Post()
  @UseGuards(AdminGuard)
  async createRequest(@Body() requestDto: ClientRequestDto) {
    const data =
      await this.clientRequestService.createClientRequest(requestDto);
    return {
      message: 'client request created successfully',
      data,
    };
  }

  @Patch('/assignToMe/:requestId')
  @UseGuards(AgentGuard)
  async assignToMe(
    @Req() req: any,
    @Param('requestId') requestId: Types.ObjectId,
  ) {
    const data = await this.clientRequestService.assignToMe(
      req.userId,
      requestId,
    );
    return {
      message: 'client request assigned successfully',
      data,
    };
  }

  @Patch('/updateStatus/:requestId')
  @UseGuards(AgentGuard)
  async updateClientRequestStatus(
    @Req() req: any,
    @Param('requestId') requestId: Types.ObjectId,
    @Body() updateRequestStatusDto: UpdateRequestStatusDto,
  ) {
    const data = await this.clientRequestService.updateStatus(
      requestId,
      req.userId,
      updateRequestStatusDto.status,
    );
    return {
      message: 'request status updated successfully',
      data,
    };
  }
}
