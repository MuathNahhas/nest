import { Module } from '@nestjs/common';
import { AccountController } from './controller/account.controller';
import { AccountService } from './services/account.service';
import { AccountRepository } from './repositories/account.repository';
import { DatabaseModule } from '../config/database.module';
import { RedisModule } from '../redis/ redis.module';

@Module({
  imports: [DatabaseModule, RedisModule],
  controllers: [AccountController],
  providers: [AccountService, AccountRepository],
})
export class AccountModule {}
