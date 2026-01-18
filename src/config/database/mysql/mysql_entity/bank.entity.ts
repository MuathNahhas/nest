export interface AccountTable {
  account_id: number;
  product_cd: string;
  cust_id: number;
  open_date: Date;
  close_date: Date;
  last_activity_date: Date;
  status: string;
  open_branch_id: number;
  open_emp_id: number;
  avail_balance: number;
  pending_balance: number;
}
