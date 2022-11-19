import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsBoolean, IsMongoId, IsNumber} from "class-validator";


export type TableBillDocument = TableBill & Document;

@Schema({
    versionKey: false,
    collection: 'table-bill'
})
export class TableBill {
    @ApiProperty()
    @IsMongoId()
    _id: string

    @ApiProperty()
    @IsNumber()
    @Prop({ required: true, min: 0 })
    table_number: number;

    @ApiProperty()
    @Prop({required: true})
    table_order_id: string

    @ApiProperty()
    @IsArray()
    @Prop({required: true, default: []})
    user_bills: UserBills[];
}

export const TableBillSchema = SchemaFactory.createForClass(TableBill);

export class UserBills {

    @ApiProperty()
    @IsNumber()
    @Prop({ required: true, min: 0 })
    user_id: number;

    @ApiProperty()
    @IsArray()
    @Prop({required: true, default: []})
    items_in_cart: string[];

    @ApiProperty()
    @IsBoolean()
    @Prop({required: true, default: false})
    is_paid: boolean;
}
