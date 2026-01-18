import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/env.config';
import { MysqlDb } from './config/database/mysql/mysql-database.service';
import { PgDb } from './config/database/postgres/postgress-database.service';
import { AccountController } from './account/controller/account.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
      load: [databaseConfig],
      cache: true,
    }),
  ],
  controllers: [AccountController],
  providers: [MysqlDb, PgDb],
})
export class AppModule {}
