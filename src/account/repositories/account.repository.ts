import { BadRequestException, Injectable } from '@nestjs/common';
import { MysqlDb } from '../../config/database/mysql/mysql-database.service';
import { CreateAccountItemDto } from '../dto/create-account.dto';
import { RedisService } from '../../redis/redis.service';
import { notFoundMessage } from '../../helper/response/error-messages';

@Injectable()
export class AccountRepository {
  private readonly databaseName = 'account';
  constructor(
    private readonly mysqlDatabase: MysqlDb,
    private readonly redisService: RedisService,
  ) {}

  private database() {
    return this.mysqlDatabase.MysqlDatabase;
  }
  private selectFromAccountTable() {
    return this.database().selectFrom(this.databaseName);
  }
  private insertInToAccountTable() {
    return this.database().insertInto(this.databaseName);
  }
  async findAll() {
    return this.selectFromAccountTable().selectAll().execute();
  }

  async findOne(id: number) {
    try {
      const cacheKey = `account:${id}`;
      const cached = await this.redisService.getCache(cacheKey);
      if (cached) {
        return cached;
      } else {
        const result = await this.selectFromAccountTable()
          .selectAll()
          .where('account_id', '=', id)
          .executeTakeFirstOrThrow();
        await this.redisService.setCache(cacheKey, result);
        return result;
      }
    } catch (error) {
      notFoundMessage(error);
    }
  }

  async create(createAccountDto: CreateAccountItemDto[]) {
    try {
      await this.insertInToAccountTable().values(createAccountDto).execute();
      return {
        status: 'success',
      };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
