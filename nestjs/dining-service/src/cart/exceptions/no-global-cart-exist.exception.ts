import {ErrorDto} from "../../shared/dto/error.dto";
import {HttpStatus} from "@nestjs/common";


export class NoGlobalCartExistException extends ErrorDto {
    constructor(tableNumber: number) {
        super(HttpStatus.UNPROCESSABLE_ENTITY, `The table ${tableNumber} have any global cart oppenned`);
    }
}
