import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {CartService} from "../services/cart.service";
import {TableCart, UserCart} from "../schemas/table-cart.schema";
import {MenuItemDto} from "../dto/menu-item.dto";
import {ApiBody} from "@nestjs/swagger";
import {StartOrderingDto} from "../../table-orders/dto/start-ordering.dto";
import {CustomerCountDto} from "../dto/dtos.dto";

@Controller('cart')
export class CartController {

    constructor(private readonly cartService: CartService) {}

    @Get('/:tableNumber')
    public async getGlobalCartForOneTable(@Param('tableNumber') tableNumber: number): Promise<TableCart> {
        return this.cartService.getGlobalCartForOneTable(tableNumber);
    }


    @ApiBody({ type: CustomerCountDto})
    @Post('/:tableNumber/openGlobalCart')
    public async openGlobalCart(@Param('tableNumber') tableNumber: number, @Body() body: CustomerCountDto):  Promise<TableCart> {
        return this.cartService.openGlobalCart(tableNumber, body.customersCount);
    }

    @Post('/:tableNumber/deleteGlobalCart')
    public async closeGlobalCart(@Param('tableNumber') tableNumber: number):  Promise<TableCart> {
        return this.cartService.deleteGlobalCart(tableNumber);
    }

    @Put(':tableNumber/createUserCart')
    public async createUserCart(@Param('tableNumber') tableNumber: number): Promise<TableCart> {
        return this.cartService.createUserCart(tableNumber);
    }

    @ApiBody({ type: MenuItemDto})
    @Put(':tableNumber/addItemToUserCart/:userCartId')
    public async addItemToUserCart(@Param('tableNumber') tableNumber: number, @Param('userCartId') userCartId: number, @Body() menuItem: MenuItemDto ) {
        return this.cartService.addItemToUserCart(tableNumber, userCartId, menuItem);
    }

    @ApiBody({ type: MenuItemDto})
    @Put(':tableNumber/removeItemToUserCart/:userCartId')
    public async removeItemToUserCart(@Param('tableNumber') tableNumber: number, @Param('userCartId') userCartId: number, @Body() menuItem: MenuItemDto ) {
        return this.cartService.removeItemToUserCart(tableNumber, userCartId, menuItem);
    }

    @Delete(':tableNumber/validateGlobalOrder')
    public async validateGlobalOrder(@Param('tableNumber') tableNumber: number): Promise<any> {
        return this.cartService.validateGlobalOrder(tableNumber);
    }
}
