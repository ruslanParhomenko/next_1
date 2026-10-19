import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ScheduleService } from './schedule.service.js';
import { CreateScheduleDto } from './dto/create-schedule.dto.js';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  getScheduleByQuery(
    @Query('month') month: string,
    @Query('year') year: string,
    @Query('tab') tab: string,
  ) {
    return this.scheduleService.findByQuery({
      month: Number(month),
      year: Number(year),
      tab,
    });
  }

  @Post()
  create(@Body() dtoCreate: CreateScheduleDto) {
    console.log('controller dto create', dtoCreate);
    return this.scheduleService.create(dtoCreate);
  }
}
