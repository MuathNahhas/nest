import type { ColumnType } from 'kysely';
import { AccountStatusEnum } from '../../../../account/enum/AccountStatusEnum';

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;

export interface AccountTable {
  account_id: Generated<number>;
  avail_balance: number | null;
  close_date: Date | null;
  cust_id: number;
  last_activity_date: Date | null;
  open_branch_id: number | null;
  open_date: Date;
  open_emp_id: number | null;
  pending_balance: number | null;
  product_cd: string;
  status: string;
}
