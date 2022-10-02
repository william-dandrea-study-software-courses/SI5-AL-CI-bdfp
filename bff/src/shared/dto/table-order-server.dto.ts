import {ApiProperty} from "@nestjs/swagger";
import {ArrayNotEmpty, IsArray, IsDateString, IsMongoId, IsNotEmpty} from "class-validator";
import {Prop} from "@nestjs/mongoose";


export class TableOrderServerDto {

    @ApiProperty()
    _id: string;

    @ApiProperty()
    @Prop({ required: true, min: 0 })
    tableNumber: number;

    @ApiProperty()
    @Prop({ required: true, min: 0 })
    customersCount: number;

    @ApiProperty()
    @Prop({ required: true, default: new Date() })
    opened: Date;

    @ApiProperty()
    @Prop({ default: [] })
    lines: OrderingLineDto[];

    @ApiProperty()
    @Prop({ default: null })
    preparations: PreparationDto[];

    @ApiProperty()
    @Prop({ default: null })
    billed: Date;
}

export class PreparationDto {
    @ApiProperty()
    @IsMongoId()
    _id: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDateString()
    shouldBeReadyAt: string;

    @ApiProperty()
    @ArrayNotEmpty()
    @IsArray({ each: true })
    preparedItems: PreparedItemDto[];
}

export class PreparedItemDto {
    @ApiProperty()
    @IsMongoId()
    _id: string;

    @ApiProperty()
    @IsNotEmpty()
    shortName: string;
}

export class OrderingLineDto {

    @ApiProperty()
    @Prop({ required: true })
    item: OrderingItemDto;

    @ApiProperty()
    @Prop({ required: true, min: 0 })
    howMany: number;

    @ApiProperty()
    @Prop({ default: false })
    sentForPreparation: boolean;
}

export class OrderingItemDto {
    @ApiProperty()
    _id: string; // id of the item from the menu

    @ApiProperty()
    shortName: string;
}
