import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { LlmModule } from './llm/llm.module.js';
import { ScheduleModule } from './schedule/schedule.module.js';

@Module({
  imports: [LlmModule, ScheduleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
