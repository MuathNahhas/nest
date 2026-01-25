import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/env.config';
import { MysqlDb } from './config/database/mysql/mysql-database.service';
import { PgDb } from './config/database/postgres/postgress-database.service';
import { RedisModule } from './redis/ redis.module';
import { AccountModule } from './account/account.module';
import { DatabaseModule } from './config/database.module';
import { LoggerModule } from './logger/logger.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
      load: [databaseConfig],
      cache: true,
    }),
    RedisModule,
    AccountModule,
    DatabaseModule,
    LoggerModule,
    AuthenticationModule,
    UsersModule,
  ],
  providers: [MysqlDb, PgDb],
})
export class AppModule {}
