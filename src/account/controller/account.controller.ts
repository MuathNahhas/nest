import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AccountService } from '../services/account.service';
import { CreateAccountDto } from '../dto/create-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}
  @Get('all-accounts')
  findAll() {
    return this.accountService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') accountId: string) {
    return this.accountService.findOne(+accountId);
  }
  @Post('create-account')
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }
}
