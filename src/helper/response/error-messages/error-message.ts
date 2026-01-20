import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ErrorMessagesEnum } from '../../../shared/enum/error-messages.enum';

export const notFoundMessage = (error) => {
  if (error.message === ErrorMessagesEnum.Not_Found) {
    throw new NotFoundException(ErrorMessagesEnum.Not_Found);
  } else {
    throw new InternalServerErrorException(error);
  }
};
