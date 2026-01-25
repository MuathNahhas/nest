import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { MysqlDb } from '../../config/database/mysql/mysql-database.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersRepository {
  private readonly databaseName = 'users';
  constructor(private readonly mysqlDatabase: MysqlDb) {}

  private database() {
    return this.mysqlDatabase.MysqlDatabase;
  }
  private selectFromUsersTable() {
    return this.database().selectFrom(this.databaseName);
  }
  private insertInToUsersTable() {
    return this.database().insertInto(this.databaseName);
  }
  async create(createUserDto: CreateUserDto) {
    const password = createUserDto.password;
    const hash = await bcrypt.hash(password, 10);
    createUserDto = { ...createUserDto, password: hash };
    await this.insertInToUsersTable().values(createUserDto).execute();
    return {
      status: 'success',
    };
  }
  async findOne(id: number) {
    return this.selectFromUsersTable()
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirstOrThrow();
  }

  async findOneByUserName(userName: string) {
    return this.selectFromUsersTable()
      .selectAll()
      .where('username', '=', userName)
      .executeTakeFirstOrThrow();
  }
}
