import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LlmModule } from './llm/llm.module.js';
import { ScheduleModule } from './schedule/schedule.module.js';
import { EmployeeModule } from './employee/employee.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { LoggerMiddleware } from './common/middleware/loger/logger.middleware.js';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    LlmModule,
    ScheduleModule,
    EmployeeModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
