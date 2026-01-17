import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mysql from 'mysql2/promise';
@Injectable()
export class MysqlDb implements OnModuleInit, OnModuleDestroy {
  private pool: mysql.Pool;
  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const config = this.configService.get('database.mysql');
    this.pool = await mysql.createPool({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database,

      waitForConnections: true,
      connectionLimit: 20,
      queueLimit: 0,
    });
    console.log('✅ MySQL connected:', config.host);
  }
  async onModuleDestroy() {
    await this.pool.end();
    console.log('MySQL Pool closed');
  }
}
