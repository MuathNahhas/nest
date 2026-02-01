import { Global, Module } from '@nestjs/common';
import { QueueService } from './service/queue.service';
import { BullModule } from '@nestjs/bullmq';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { QUEUES } from './queue.constants';
import { LoggerModule } from '../logger/logger.module';
import { PhotoProcessor } from './processors/photo.processor';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          connection: {
            host: config.get('DEV_REDIS_HOST'),
            port: config.get<number>('DEV_REDIS_PORT'),
            username: config.get<string>('DEV_REDIS_USERNAME'),
            password: config.get<string>('DEV_REDIS_PASSWORD'),
            db: config.get<number>('DEV_REDIS_DATABASE'),
            family: Number(config.get<number>('DEV_REDIS_FAMILY')),
            maxRetriesPerRequest: null,
            enableReadyCheck: true,
          },
        };
      },
    }),
    BullModule.registerQueue({ name: QUEUES.PHOTO }),
    LoggerModule,
  ],
  providers: [QueueService, PhotoProcessor],
  exports: [QueueService, BullModule],
})
export class QueueModule {}
