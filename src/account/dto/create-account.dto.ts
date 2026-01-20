import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AccountStatusEnum } from '../enum/AccountStatusEnum';

export class CreateAccountDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAccountItemDto)
  request: CreateAccountItemDto[];
}

export class CreateAccountItemDto {
  @IsString()
  @IsNotEmpty()
  product_cd: string;

  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  cust_id: number;

  @IsDateString()
  @IsNotEmpty()
  open_date: Date;

  @IsEnum(AccountStatusEnum)
  @IsNotEmpty()
  status: AccountStatusEnum;
}
