import { Module } from '@nestjs/common';
import { MysqlDb } from './database/mysql/mysql-database.service';
import { PgDb } from './database/postgres/postgress-database.service';

@Module({
  providers: [MysqlDb, PgDb],
  exports: [MysqlDb, PgDb],
})
export class DatabaseModule {}
