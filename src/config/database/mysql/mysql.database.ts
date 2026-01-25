import { AccountTable } from './mysql_entity/bank.entity';
import { UsersTable } from './mysql_entity/users.entity';
export interface MysqlDatabase {
  account: AccountTable;
  users: UsersTable;
}
