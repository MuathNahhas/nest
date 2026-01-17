import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './config/database.config';
import appConfig from './config/app.config';
import { MysqlDatabaseService } from './config/database/mysql-database.service';
import { PostgresDatabaseService } from './config/database/postgress-database.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
      load: [databaseConfig, appConfig],
    }),
  ],
  providers: [MysqlDatabaseService, PostgresDatabaseService],
})
export class AppModule {}
