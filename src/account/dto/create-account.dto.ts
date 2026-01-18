import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AccountStatusEnum } from '../enum/AccountStatusEnum';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsNumber()
  account_id: number;
  @IsNotEmpty()
  @IsString()
  product_cd: string;
  @IsNotEmpty()
  @IsNumber()
  cust_id: number;
  @IsNotEmpty()
  open_date: Date;
  @IsNotEmpty()
  @IsEnum(AccountStatusEnum)
  status: string;
}
