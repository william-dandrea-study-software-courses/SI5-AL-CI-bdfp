import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsMongoId, IsNumber, IsString} from "class-validator";
import {Document} from "mongoose";

export type TableCartDocument = TableCart & Document;

@Schema({
    versionKey: false,
    collection: 'table-cart'
})
export class TableCart {
    @ApiProperty()
    @IsMongoId()
    _id: string

    @ApiProperty()
    @IsNumber()
    @Prop({ required: true, min: 0 })
    table_number: number;

    @ApiProperty()
    @Prop({required: true})
    table_order_id: string;

    @ApiProperty()
    @Prop({required: true})
    table_bill_id: string;

    @ApiProperty()
    @IsNumber()
    @Prop({required: true, min: 0})
    price: number;

    @ApiProperty()
    @IsArray()
    @Prop({ required: true, default: [] })
    user_carts: UserCart[];
}

export const TableCartSchema = SchemaFactory.createForClass(TableCart);


export class UserCart {

    @ApiProperty()
    @IsMongoId()
    _id: string

    @ApiProperty()
    @IsNumber()
    @Prop({ required: true, min: 0 })
    id_user: number;

    @ApiProperty()
    @IsNumber()
    @Prop({required: true, min: 0})
    price: number;

    @ApiProperty()
    @IsArray()
    @Prop({ required: true, default: [] })
    items_in_cart: ItemInCart[];
}


export class ItemInCart {
    id_item: string;
    shortName: string;
    price: number;
}


