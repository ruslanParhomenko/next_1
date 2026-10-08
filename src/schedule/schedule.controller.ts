import { Controller, Get } from '@nestjs/common';
import { ScheduleService } from './schedule.service.js';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get()
  getHello(): { message: string } {
    return {
      message: 'Hello World!',
    };
  }
}
