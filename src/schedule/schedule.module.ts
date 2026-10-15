import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service.js';
import { ScheduleController } from './schedule.controller.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService, PrismaService],
})
export class ScheduleModule {}
