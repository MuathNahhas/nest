import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
@Injectable()
export class PgDb implements OnModuleInit {
  private client: Client;
  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const config = this.configService.get('database.postgres');
    this.client = new Client({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database,
    });
    await this.client.connect();
    console.log('✅ PostgreSQL connected:', config.host);
  }
}
