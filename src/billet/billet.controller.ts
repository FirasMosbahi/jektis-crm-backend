import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AgentGuard } from '../guards/agent.guard';
import { AdminGuard } from '../guards/admin.guard';
import { BilletService } from './billet.service';
import { BilletRequestDto } from '../dtos/billet.dto';

@Controller('billet')
export class BilletController {
  constructor(private readonly billetService: BilletService) {}
  @Get()
  @UseGuards(AgentGuard)
  async getRequests() {
    const data = await this.billetService.getBilletRequests();
    return {
      message: 'hotel reservation requests fetched successfully',
      data,
    };
  }

  @Post()
  @UseGuards(AdminGuard)
  async createRequest(@Body() requestDto: BilletRequestDto) {
    const data = await this.billetService.createBilletRequest(requestDto);
    return {
      message: 'client request created successfully',
      data,
    };
  }
}
