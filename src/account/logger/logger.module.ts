import { Module } from '@nestjs/common';
import { MyLoggerService } from './logger-service';

@Module({
  exports: [MyLoggerService],
  providers: [MyLoggerService],
})
export class LoggerModule {}
