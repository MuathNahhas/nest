import { Module } from '@nestjs/common';
import { UsersService } from './service/users.service';
import { UsersRepository } from './repository/users.repository';
import { DatabaseModule } from '../config/database.module';
import { UsersController } from './controller/users.controller';

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, UsersRepository],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
