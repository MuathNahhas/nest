import { Module } from '@nestjs/common';
import { AccountController } from './controller/account.controller';
import { AccountService } from './services/account.service';
import { AccountRepository } from './repositories/account.repository';
import { DatabaseModule } from '../config/database.module';
import { RedisModule } from '../redis/ redis.module';
import { LoggerModule } from '../logger/logger.module';
import { JwtModule } from '@nestjs/jwt';
import { QueueModule } from '../queue/queue.module';

@Module({
  imports: [DatabaseModule, RedisModule, LoggerModule, JwtModule, QueueModule],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
})
export class AccountModule {}
