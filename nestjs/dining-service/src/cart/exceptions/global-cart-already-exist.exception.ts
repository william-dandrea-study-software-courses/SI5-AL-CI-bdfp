import {ErrorDto} from "../../shared/dto/error.dto";
import {AddMenuItemDto} from "../../table-orders/dto/add-menu-item.dto";
import {HttpStatus} from "@nestjs/common";

export class GlobalCartAlreadyExistException extends ErrorDto {
    constructor(tableNumber: number) {
        super(HttpStatus.UNPROCESSABLE_ENTITY, `The table ${tableNumber} have an existing global cart, please remove it before create a new one`);
    }
}
