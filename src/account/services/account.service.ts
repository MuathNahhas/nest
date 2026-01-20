import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../repositories/account.repository';
import { CreateAccountDto } from '../dto/create-account.dto';

@Injectable()
export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async findAll() {
    return await this.accountRepository.findAll();
  }

  async findOne(accountId: number) {
    return await this.accountRepository.findOne(accountId);
  }

  async create(createAccountDto: CreateAccountDto) {
    const createAccountRequest = createAccountDto.request;
    return await this.accountRepository.create(createAccountRequest);
  }
}
