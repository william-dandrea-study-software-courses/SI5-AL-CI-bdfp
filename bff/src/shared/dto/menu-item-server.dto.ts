import {ApiProperty} from "@nestjs/swagger";

export enum CategoryEnum {
    STARTER = 'STARTER',
    MAIN = 'MAIN',
    DESSERT = 'DESSERT',
    BEVERAGE = 'BEVERAGE',
}

export class MenuItemServerDto {
    @ApiProperty()
    _id: string;

    @ApiProperty()
    fullName: string;

    @ApiProperty()
    shortName: string;

    @ApiProperty()
    price: number;

    @ApiProperty()
    category: CategoryEnum;

    @ApiProperty()
    image: string;
}
