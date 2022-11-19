import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {ItemInCart, TableCart, TableCartDocument, UserCart} from "../schemas/table-cart.schema";
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
import {BillingService} from "../../billing/services/billing.service";
import {TableBill} from "../../billing/schemas/user-bill.schema";

@Injectable()
export class CartService {

    constructor(
        @InjectModel(TableCart.name) private tableCartModel: Model<TableCartDocument>,
        private readonly tableOrderService: TableOrdersService,
        private readonly menuProxyService: MenuProxyService,
        private readonly billingService: BillingService,
    ) {}

    public async openGlobalCart(tableNumber: number, customerCount: number): Promise<TableCart> {

        const potentialCurrentOpenedGlobalCart = await this.tableCartModel.findOne({table_number: tableNumber});

        if (potentialCurrentOpenedGlobalCart === null) {

            const startOrderingResult: TableOrder = await this.tableOrderService.startOrdering({tableNumber: tableNumber, customersCount: customerCount})

            const tableCart: TableCart = new TableCart();
            tableCart.table_number = tableNumber;
            tableCart.table_order_id = startOrderingResult._id;
            tableCart.price = 0;

            const tableBill: TableBill = await this.billingService.createTableBill({tableNumber: tableNumber, tableOrderId: startOrderingResult._id})
            tableCart.table_bill_id = tableBill._id;

            return await this.tableCartModel.create(tableCart);
        }

        return this.tableCartModel.findOneAndUpdate({table_number: tableNumber}, {user_carts: []}, { returnDocument: 'after' })


    }

    private async closeGlobalCart(tableNumber: number): Promise<TableCart> {
        const currentOpenedGlobalCart: TableCart = await this.tableCartModel.findOne({table_number: tableNumber})

        if (currentOpenedGlobalCart) {
            for (const userCart of currentOpenedGlobalCart.user_carts) {
                userCart.items_in_cart = [];
            }

            return this.tableCartModel.findOneAndUpdate({table_number: tableNumber}, {user_carts: currentOpenedGlobalCart.user_carts});
        }

        throw new NoGlobalCartExistException(tableNumber)
    }

    public async deleteGlobalCart(tableNumber: number): Promise<TableCart> {
        return this.tableCartModel.findOneAndDelete({table_number: tableNumber}, { returnDocument: 'after' });
    }

    public async createUserCart(tableNumber: number): Promise<UserCart> {
        const currentCart: TableCart = await this.tableCartModel.findOne({table_number: tableNumber});

        if (currentCart != null) {

            const userCart: UserCart = new UserCart();
            userCart.id_user = currentCart.user_carts.length;
            userCart.items_in_cart = [];
            userCart.price = 0;

            const result = await this.tableCartModel.findOneAndUpdate({table_number: tableNumber}, {'$push': {'user_carts': userCart}})

            if (result) {
                return userCart;
            } else {
                throw new HttpException("Cannot write in DB", HttpStatus.UNPROCESSABLE_ENTITY)
            }
            // return await this.tableCartModel.findOne({table_number: tableNumber});
        }

        throw new NoGlobalCartExistException(tableNumber)
    }

    public async addItemToUserCart(tableNumber: number, userCartId: number, menuItem: MenuItemDto): Promise<UserCart> {
        const currentCart: TableCart = await this.tableCartModel.findOne({table_number: tableNumber});
        if (currentCart) {

            //{'table_number': Number(tableNumber), 'user_carts.id_user': Number(userCartId)}
            const currentUserCart: UserCart = currentCart.user_carts.find(uc => uc.id_user === Number(userCartId))

            if (currentUserCart) {

                const menuItemReal: any | null = await this.menuProxyService.isMenuItemIdExist(menuItem.id_item)

                if (menuItemReal) {
                    const menuItemMongo: ItemInCart = new ItemInCart();
                    menuItemMongo.id_item = menuItemReal._id;
                    menuItemMongo.price = menuItemReal.price;
                    menuItemMongo.shortName = menuItemReal.shortName;

                    currentUserCart.items_in_cart.push(menuItemMongo);
                    currentUserCart.price = currentUserCart.price + menuItemMongo.price
                    currentCart.price += currentUserCart.price
                    // await this.tableCartModel.findOneAndUpdate({table_number: tableNumber}, {items_in_cart: currentUserCart.items_in_cart})

                    const result = await this.tableCartModel.findOneAndUpdate({table_number: tableNumber}, {'user_carts': currentCart.user_carts, 'price': currentCart.price});
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

                const indexOfElementToRemove: number = currentUserCart.items_in_cart.findIndex(it => it.id_item === String(menuItem.id_item));
                // await this.tableCartModel.findOneAndUpdate({table_number: tableNumber}, {items_in_cart: currentUserCart.items_in_cart})
                console.log(currentUserCart)

                if (indexOfElementToRemove >= 0) {

                    const elementToRemove: ItemInCart = currentUserCart.items_in_cart[indexOfElementToRemove]

                    currentUserCart.items_in_cart.splice(indexOfElementToRemove, 1);
                    currentUserCart.price = currentUserCart.price - elementToRemove.price
                    currentCart.price -= elementToRemove.price

                    const result = await this.tableCartModel.findOneAndUpdate({table_number: tableNumber}, {'user_carts': currentCart.user_carts,  'price': currentCart.price});
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
                    console.log("bonourno", itemId)
                    const tableOrder: TableOrder = await this.tableOrderService.addOrderingLineToTableOrderViaItemsId(currentCart.table_order_id, itemId.id_item);
                    if (!tableOrder) {
                        throw new ErrorDto(HttpStatus.NOT_FOUND, `Cannot send the item ${itemId} to the ordering line`)
                    }
                }

                await this.billingService.createUserBill({tableBillId: currentCart.table_bill_id, userId: userCart.id_user, itemsInCart: userCart.items_in_cart})
            }

            const result = await this.tableOrderService.sendItemsForPreparation(currentCart.table_order_id);
            await this.closeGlobalCart(tableNumber);

            return result;
        }

        throw new NoGlobalCartExistException(tableNumber)
    }

    public async getGlobalCartForOneTable(tableNumber: number): Promise<TableCart>  {
        const result: TableCart = await this.tableCartModel.findOne({table_number: tableNumber});

        if (result) {
            return result
        }

        throw new NoGlobalCartExistException(tableNumber)
    }




}
