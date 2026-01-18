import { AccountTable } from './mysql_entity/bank.entity';

export interface MysqlDatabase {
  account: AccountTable;
}
