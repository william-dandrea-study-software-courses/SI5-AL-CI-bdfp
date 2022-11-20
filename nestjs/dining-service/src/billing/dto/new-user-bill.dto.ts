import {ItemInCart} from "../schemas/user-bill.schema";


export class NewUserBillDto {
    tableBillId: string;
    userId: number;
    itemsInCart: ItemInCart[];
}

