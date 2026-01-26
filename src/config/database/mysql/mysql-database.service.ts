import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Kysely, MysqlDialect } from 'kysely';
import { createPool, Pool } from 'mysql2';
import { MysqlDatabase } from './mysql.database';
import pRetry from 'p-retry';
@Injectable()
export class MysqlDb implements OnModuleInit, OnModuleDestroy {
  public MysqlDatabase: Kysely<MysqlDatabase>;
  private pool: Pool;

  constructor(private readonly configService: ConfigService) {}

  async onModuleInit() {
    const config = this.configService.get('database.mysql');
    await pRetry(
      async () => {
        this.pool = createPool({
          host: config.host,
          port: config.port,
          user: config.username,
          password: config.password,
          database: config.database,
          waitForConnections: true,
          connectionLimit: 20,
          queueLimit: 0,
        });

        this.MysqlDatabase = new Kysely<MysqlDatabase>({
          dialect: new MysqlDialect({ pool: this.pool }),
        });
        console.log('✅ MySQL connected:', config.host);
      },
      {
        retries: 5,
        onFailedAttempt: (error) => {
          console.warn(
            `❌ MySQL connection failed (attempt ${error.attemptNumber}): ${error.error?.message || error.error}}`,
          );
        },
      },
    );
  }
  async onModuleDestroy() {
    if (this.pool) {
      await this.pool.end();
      console.log('MySQL pool closed');
    }
  }
}
