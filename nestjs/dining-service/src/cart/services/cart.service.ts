import {HttpStatus, Injectable} from '@nestjs/common';
import {TableCart, TableCartDocument, UserCart} from "../schemas/table-cart.schema";
import {MenuItemDto} from "../dto/menu-item.dto";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {GlobalCartAlreadyExistException} from "../exceptions/global-cart-already-exist.exception";
import {NoGlobalCartExistException} from "../exceptions/no-global-cart-exist.exception";
import {ErrorDto} from "../../shared/dto/error.dto";
import {TableOrdersService} from "../../table-orders/services/table-orders.service";
import {TableOrder} from "../../table-orders/schemas/table-order.schema";
import {PreparationDto} from "../../table-orders/dto/preparation.dto";
import {MenuProxyService} from "./menu-proxy.service";

@Injectable()
export class CartService {

    constructor(
        @InjectModel(TableCart.name) private tableCartModel: Model<TableCartDocument>,
        private readonly tableOrderService: TableOrdersService,
        private readonly menuProxyService: MenuProxyService,
    ) {}

    public async openGlobalCart(tableNumber: number, customerCount: number): Promise<TableCart> {

        const potentialCurrentOpenedGlobalCart = await this.tableCartModel.findOne({table_number: tableNumber});


        if (potentialCurrentOpenedGlobalCart === null) {

            const startOrderingResult: TableOrder = await this.tableOrderService.startOrdering({tableNumber: tableNumber, customersCount: customerCount})

            const tableCart: TableCart = new TableCart();
            tableCart.table_number = tableNumber;
            tableCart.table_order_id = startOrderingResult._id;

            return await this.tableCartModel.create(tableCart);
        }

        throw new GlobalCartAlreadyExistException(tableNumber);
    }

    private async closeGlobalCart(tableNumber: number): Promise<TableCart> {
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

                const isMenuItemIdExist: boolean = await this.menuProxyService.isMenuItemIdExist(menuItem.id_item)

                if (isMenuItemIdExist) {
                    currentUserCart.items_in_cart.push(menuItem.id_item);
                    // await this.tableCartModel.findOneAndUpdate({table_number: tableNumber}, {items_in_cart: currentUserCart.items_in_cart})

                    const result = await this.tableCartModel.findOneAndUpdate({table_number: tableNumber}, {'user_carts': currentCart.user_carts});
                    if (result) {
                        return currentUserCart;
                    } else {
                        throw new ErrorDto(HttpStatus.UNPROCESSABLE_ENTITY, "Cannot update the database")
                    }
                } else {
                    throw new ErrorDto(HttpStatus.NOT_FOUND, `Cannot find the menuItem with the id ${menuItem.id_item}`)
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

    public async validateGlobalOrder(tableNumber: number): Promise<PreparationDto[]> {
        const currentCart: TableCart = await this.tableCartModel.findOne({table_number: tableNumber});

        if (currentCart) {
            for (const userCart of currentCart.user_carts) {
                for (const itemId of userCart.items_in_cart) {
                    const tableOrder: TableOrder = await this.tableOrderService.addOrderingLineToTableOrderViaItemsId(currentCart.table_order_id, itemId);
                    if (!tableOrder) {
                        throw new ErrorDto(HttpStatus.NOT_FOUND, `Cannot send the item ${itemId} to the ordering line`)
                    }
                }
            }

            const result = await this.tableOrderService.sendItemsForPreparation(currentCart.table_order_id);
            await this.closeGlobalCart(tableNumber);
            return result;
        }

        throw new NoGlobalCartExistException(tableNumber)
    }

    public async getGlobalCartForOneTable(tableNumber: number): Promise<TableCart>  {
        return null;
    }




}
