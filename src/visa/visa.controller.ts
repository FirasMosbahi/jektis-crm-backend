import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AgentGuard } from '../guards/agent.guard';
import { AdminGuard } from '../guards/admin.guard';
import { VisaService } from './visa.service';
import { CreateVisaRequestDto } from '../dtos/visa.dto';

@Controller('visa')
export class VisaController {
  constructor(private readonly visaService: VisaService) {}
  @Get()
  @UseGuards(AgentGuard)
  async getRequests() {
    const data = await this.visaService.getVisaRequests();
    return {
      message: 'visa reservation requests fetched successfully',
      data,
    };
  }

  @Post()
  @UseGuards(AdminGuard)
  async createRequest(@Body() requestDto: CreateVisaRequestDto) {
    const data = await this.visaService.createVisaRequest(requestDto);
    return {
      message: 'visa request created successfully',
      data,
    };
  }
}
