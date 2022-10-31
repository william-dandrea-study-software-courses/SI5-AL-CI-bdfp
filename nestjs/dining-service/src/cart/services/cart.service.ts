import {HttpStatus, Injectable} from '@nestjs/common';
import {TableCart, TableCartDocument, UserCart} from "../schemas/table-cart.schema";
import {MenuItemDto} from "../dto/menu-item.dto";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {GlobalCartAlreadyExistException} from "../exceptions/global-cart-already-exist.exception";
import {NoGlobalCartExistException} from "../exceptions/no-global-cart-exist.exception";
import {ErrorDto} from "../../shared/dto/error.dto";

@Injectable()
export class CartService {

    constructor(
        @InjectModel(TableCart.name) private tableCartModel: Model<TableCartDocument>
    ) {}

    public async openGlobalCart(tableNumber: number): Promise<TableCart> {

        const potentialCurrentOpenedGlobalCart = await this.tableCartModel.findOne({table_number: tableNumber});

        if (potentialCurrentOpenedGlobalCart === null) {
            const tableCart: TableCart = new TableCart();
            tableCart.table_number = tableNumber;

            return await this.tableCartModel.create(tableCart);
        }

        throw new GlobalCartAlreadyExistException(tableNumber);
    }

    public async closeGlobalCart(tableNumber: number): Promise<TableCart> {
        const currentOpenedGlobalCart = await this.tableCartModel.findOneAndDelete({table_number: tableNumber})

        if (currentOpenedGlobalCart !== null) {
            return currentOpenedGlobalCart;
        }

        throw new NoGlobalCartExistException(tableNumber)
    }

    public async createUserCart(tableNumber: number): Promise<TableCart> {
        const currentCart: TableCart = await this.tableCartModel.findOne({table_number: tableNumber});

        if (currentCart != null) {

            const userCart: UserCart = new UserCart();
            userCart.id_user = currentCart.user_carts.length;
            userCart.items_in_cart = [];

            await this.tableCartModel.findOneAndUpdate({table_number: tableNumber}, {'$push': {'user_carts': userCart}})
            return await this.tableCartModel.findOne({table_number: tableNumber});
        }

        throw new NoGlobalCartExistException(tableNumber)
    }

    public async addItemToUserCart(tableNumber: number, userCartId: number, menuItem: MenuItemDto): Promise<UserCart> {
        const currentCart: TableCart = await this.tableCartModel.findOne({table_number: tableNumber});
        if (currentCart) {

            //{'table_number': Number(tableNumber), 'user_carts.id_user': Number(userCartId)}
            const currentUserCart: UserCart = currentCart.user_carts.find(uc => uc.id_user === Number(userCartId))

            if (currentUserCart !== null) {

                currentUserCart.items_in_cart.push(menuItem.id_item);
                // await this.tableCartModel.findOneAndUpdate({table_number: tableNumber}, {items_in_cart: currentUserCart.items_in_cart})
                console.log(currentUserCart)

                const result = await this.tableCartModel.findOneAndUpdate({table_number: tableNumber}, {'user_carts': currentCart.user_carts});
                if (result) {
                    return currentUserCart;
                } else {
                    throw new ErrorDto(HttpStatus.UNPROCESSABLE_ENTITY, "Cannot update the database")
                }

            } else {
                throw new ErrorDto(HttpStatus.UNPROCESSABLE_ENTITY, "Cannot find the user cart, please create a user cart with the good user_id")
            }
        }

        throw new NoGlobalCartExistException(tableNumber)
    }

    public async removeItemToUserCart(tableNumber: number, userCartId: number, menuItem: MenuItemDto): Promise<UserCart> {
        const currentCart: TableCart = await this.tableCartModel.findOne({table_number: tableNumber});
        if (currentCart) {

            //{'table_number': Number(tableNumber), 'user_carts.id_user': Number(userCartId)}
            const currentUserCart: UserCart = currentCart.user_carts.find(uc => uc.id_user === Number(userCartId))

            if (currentUserCart !== null) {

                const indexOfElementToRemove: number = currentUserCart.items_in_cart.findIndex(it => it === String(menuItem.id_item));
                // await this.tableCartModel.findOneAndUpdate({table_number: tableNumber}, {items_in_cart: currentUserCart.items_in_cart})
                console.log(currentUserCart)

                if (indexOfElementToRemove >= 0) {
                    console.log(indexOfElementToRemove)

                    currentUserCart.items_in_cart.splice(indexOfElementToRemove, 1);

                    const result = await this.tableCartModel.findOneAndUpdate({table_number: tableNumber}, {'user_carts': currentCart.user_carts});
                    if (result) {
                        return currentUserCart;
                    } else {
                        throw new ErrorDto(HttpStatus.UNPROCESSABLE_ENTITY, "Cannot update the database")
                    }
                } else {
                    throw new ErrorDto(HttpStatus.UNPROCESSABLE_ENTITY, "This item is not present in the user cart")
                }



            } else {
                throw new ErrorDto(HttpStatus.UNPROCESSABLE_ENTITY, "Cannot find the user cart, please create a user cart with the good user_id")
            }
        }

        throw new NoGlobalCartExistException(tableNumber)
    }

    public async validateGlobalOrder(tableNumber: number): Promise<any> {
        return null
    }

    public async getGlobalCartForOneTable(tableNumber: number): Promise<TableCart>  {
        return null;
    }




}
