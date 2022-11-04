import { HttpStatus } from '@nestjs/common';

import { ErrorDto } from '../../shared/dto/error.dto';

export class TableAlreadyTakenException extends ErrorDto {
  constructor(tableNumber: number) {
    super(HttpStatus.UNPROCESSABLE_ENTITY, 'Table is already taken', `"${tableNumber}" xis the number of a table already taken by some customers`);
  }
}
