import {ApiProperty} from "@nestjs/swagger";
import {isBoolean, IsMongoId} from "class-validator";


export class TableServerDto {
    _id: string;
    number: number;
    taken: boolean;
    tableOrderId: string | null;

}
