import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { Kysely, PostgresDialect } from 'kysely';
import { PgDatabase } from './pg.database';

@Injectable()
export class PgDb implements OnModuleInit {
  private pool: Pool;
  public PgDatabase: Kysely<PgDatabase>;
  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const config = await this.configService.get('database.postgres');
    ((this.pool = await new Pool({
      host: config.host,
      port: config.port,
      user: config.username,
      password: config.password,
      database: config.database,
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 3000,
    })),
      (this.PgDatabase = new Kysely<PgDatabase>({
        dialect: new PostgresDialect({ pool: this.pool }),
      })));
    console.log('✅ PostgreSQL connected:', config.host);
  }
  async onModuleDestroy() {
    await this.pool.end();
    console.log('PostgreSQL Pool closed');
  }
}
