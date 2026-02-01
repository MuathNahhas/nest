import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../repositories/account.repository';
import { CreateAccountDto } from '../dto/create-account.dto';
import { AccountResponseDto } from '../dto/account-response.dto';
import { QueueService } from '../../queue/service/queue.service';

@Injectable()
export class AccountService {
  constructor(
    private readonly accountRepository: AccountRepository,
    private readonly queueService: QueueService,
  ) {}

  findAll() {
    return this.accountRepository.findAll();
  }

  async findOne(accountId: number): Promise<AccountResponseDto> {
    await this.checkPhotoQueue(accountId);
    return this.accountRepository.findOne(accountId);
  }

  create(createAccountDto: CreateAccountDto) {
    const createAccountRequest = createAccountDto.request;
    return this.accountRepository.create(createAccountRequest);
  }

  async checkPhotoQueue(photoId: number) {
    await this.queueService.addPhotoToQueue(photoId);
  }
}
