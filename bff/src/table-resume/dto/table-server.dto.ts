import {ApiProperty} from "@nestjs/swagger";
import {isBoolean, IsMongoId} from "class-validator";


export class TableServerDto {

    @ApiProperty()
    @IsMongoId()
    _id: string;

    @ApiProperty()
    number: number;

    @ApiProperty()
    taken: boolean;

    @ApiProperty()
    tableOrderId: any;

}
