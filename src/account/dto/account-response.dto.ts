import { Exclude } from 'class-transformer';

export class AccountResponseDto {
  account_id: number;

  product_cd: string;

  cust_id: number;

  open_date: Date;

  close_date: Date | null;

  last_activity_date: Date | null;

  @Exclude()
  status: string;

  open_branch_id: number | null;

  open_emp_id: number | null;

  avail_balance: number | null;

  pending_balance: number | null;

  constructor(partial: Partial<AccountResponseDto>) {
    Object.assign(this, partial);
  }
}
