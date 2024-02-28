import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AgentGuard } from '../guards/agent.guard';
import { AdminGuard } from '../guards/admin.guard';
import { VoyageRequestService } from './voyage-request.service';
import { VoyageReservationRequestDto } from '../dtos/voyage-request.dto';

@Controller('voyage-request')
export class VoyageRequestController {
  constructor(private readonly voyageService: VoyageRequestService) {}
  @Get()
  @UseGuards(AgentGuard)
  async getRequests() {
    const data = await this.voyageService.getVoyageReservationRequests();
    return {
      message: 'hotel reservation requests fetched successfully',
      data,
    };
  }

  @Post()
  @UseGuards(AdminGuard)
  async createRequest(@Body() requestDto: VoyageReservationRequestDto) {
    const data =
      await this.voyageService.createVoyageReservationRequest(requestDto);
    return {
      message: 'client request created successfully',
      data,
    };
  }
}
