import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AgentGuard } from '../guards/agent.guard';
import { AdminGuard } from '../guards/admin.guard';
import { HotelService } from './hotel.service';
import { CreateHotelReservationRequestDto } from '../dtos/hotel.dto';

@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}
  @Get()
  @UseGuards(AgentGuard)
  async getRequests() {
    const data = await this.hotelService.getHotelReservationRequests();
    return {
      message: 'hotel reservation requests fetched successfully',
      data,
    };
  }

  @Post()
  @UseGuards(AdminGuard)
  async createRequest(@Body() requestDto: CreateHotelReservationRequestDto) {
    const data =
      await this.hotelService.createHotelReservationRequest(requestDto);
    return {
      message: 'client request created successfully',
      data,
    };
  }
}
