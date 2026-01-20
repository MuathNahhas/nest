import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisClient } from './redis.client';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [RedisService, RedisClient],
  exports: [RedisService],
})
export class RedisModule {}
