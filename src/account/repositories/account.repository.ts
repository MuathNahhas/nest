import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { MysqlDb } from '../../config/database/mysql/mysql-database.service';
import { CreateAccountItemDto } from '../dto/create-account.dto';
import { RedisService } from '../../redis/redis.service';
import { AccountResponseDto } from '../dto/account-response.dto';
import { ErrorMessagesEnum } from '../../shared/enum/error-messages.enum';
import { CACHE_TTL } from '../../common/constant';
import { MyLoggerService } from '../logger/logger-service';

@Injectable()
export class AccountRepository {
  private readonly databaseName = 'account';
  constructor(
    private readonly mysqlDatabase: MysqlDb,
    private readonly redisService: RedisService,
    private readonly logger: MyLoggerService,
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
  findAll() {
    return this.selectFromAccountTable().selectAll().execute();
  }

  async findOne(id: number) {
    try {
      const cacheKey = `account:${id}`;
      const cached = await this.redisService.getCache(cacheKey);
      if (cached) {
        this.logger.log('received result from redis', JSON.stringify(cached));
        return new AccountResponseDto(cached);
      } else {
        const result = await this.selectFromAccountTable()
          .selectAll()
          .where('account_id', '=', id)
          .executeTakeFirstOrThrow();
        await this.redisService.setCache(cacheKey, result, CACHE_TTL.SHORT);
        this.logger.log(
          'received result from database',
          JSON.stringify(result),
        );
        return new AccountResponseDto(result);
      }
    } catch (error) {
      if (error.message === ErrorMessagesEnum.Not_Found) {
        this.logger.error('error', JSON.stringify(error.message));
        throw new NotFoundException(ErrorMessagesEnum.Not_Found);
      } else {
        this.logger.error('errorsdfdfsdf', JSON.stringify(error.message));
        throw new InternalServerErrorException(error);
      }
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
