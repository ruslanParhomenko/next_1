import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LlmModule } from './llm/llm.module.js';
import { ScheduleModule } from './schedule/schedule.module.js';
import { EmployeeModule } from './employee/employee.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { LoggerMiddleware } from './common/middleware/loger/logger.middleware.js';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module.js';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guard/jwt-auth.guard.js';

@Module({
  imports: [
    HealthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    LlmModule,
    ScheduleModule,
    EmployeeModule,
    PrismaModule,
    HealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
