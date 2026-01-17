import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2/promise';
@Injectable()
export class MysqlDatabaseService implements OnModuleInit {
  private connection: mysql.Connection;
  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const config = this.configService.get('database.mysql');
    this.connection = await mysql.createConnection({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database,
    });
    console.log('✅ MySQL connected:', config.host);
  }
}
