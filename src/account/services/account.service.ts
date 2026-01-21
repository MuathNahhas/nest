import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../repositories/account.repository';
import { CreateAccountDto } from '../dto/create-account.dto';
import { AccountResponseDto } from '../dto/account-response.dto';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  findAll() {
    return this.accountRepository.findAll();
  }

  findOne(accountId: number): Promise<AccountResponseDto> {
    return this.accountRepository.findOne(accountId);
  }

  create(createAccountDto: CreateAccountDto) {
    const createAccountRequest = createAccountDto.request;
    return this.accountRepository.create(createAccountRequest);
  }
}
