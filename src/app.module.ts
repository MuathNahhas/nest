import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './config/env.config';
import { MysqlDb } from './config/database/mysql/mysql-database.service';
import { PgDb } from './config/database/postgres/postgress-database.service';
import { RedisModule } from './redis/ redis.module';
import { AccountModule } from './account/account.module';
import { DatabaseModule } from './config/database.module';
import { LoggerModule } from './logger/logger.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { UsersModule } from './users/users.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerStorageRedisService } from '@nest-lab/throttler-storage-redis';
import Redis from 'ioredis';

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        throttlers: [
          {
            ttl: 10000,
            limit: 6,
          },
        ],
        storage: new ThrottlerStorageRedisService(
          new Redis({
            host: config.get('DEV_REDIS_HOST'),
            port: config.get<number>('DEV_REDIS_PORT'),
            family: Number(config.get<number>('DEV_REDIS_FAMILY')),
            db: config.get('DEV_REDIS_DATABASE'),
            password: config.get('DEV_REDIS_PASSWORD'),
            username: config.get('DEV_REDIS_USERNAME'),
          }),
        ),
      }),
    }),
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
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
