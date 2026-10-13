import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { LlmModule } from './llm/llm.module.js';
import { ScheduleModule } from './schedule/schedule.module.js';
import { EmployeeModule } from './employee/employee.module.js';
import { PrismaModule } from './prisma/prisma.module.js';

@Module({
  imports: [LlmModule, ScheduleModule, EmployeeModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
