import { HttpStatus } from '@nestjs/common';

import { ErrorDto } from '../../shared/dto/error.dto';

import { AddMenuItemDto } from '../dto/add-menu-item.dto';

export class AddMenuItemNotFoundException extends ErrorDto {
    constructor(idMenuItemId: string) {
        super(HttpStatus.NOT_FOUND, 'Inconsistent AddMenuItemDto with the MenuServiceProxy', `"${idMenuItemId}" is not a valid MenuItem Id`);
    }
}
