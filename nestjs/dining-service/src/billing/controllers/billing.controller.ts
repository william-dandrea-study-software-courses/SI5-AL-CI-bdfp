import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {ApiBody, ApiParam} from "@nestjs/swagger";
import {NewUserBillDto} from "../dto/new-user-bill.dto";
import {BillingService} from "../services/billing.service";
import {NewTableBillDto} from "../dto/new-table-bill.dto";
import {TableBill, UserBills} from "../schemas/user-bill.schema";

@Controller('billing')
export class BillingController {

    constructor(private readonly billingService: BillingService) {}

    @Get('')
    public async recoverAllBillings(): Promise<TableBill[]> {
        return this.billingService.recoverAllBillings();
    }

    @Get(':tableBillId')
    public async recoverOneBilling(@Param('tableBillId') tableBillId: string): Promise<TableBill> {
        return this.billingService.recoverOneBilling(tableBillId);
    }

    @Post('/create-table-bill')
    @ApiBody({type: NewTableBillDto })
    public async createTableBill(@Body() tableBill: NewTableBillDto): Promise<TableBill> {
        return this.billingService.createTableBill(tableBill);
    }

    @Post('/user-bill')
    @ApiBody({type: NewUserBillDto })
    public async createUserBill(@Body() userBill: NewUserBillDto): Promise<UserBills> {
        return this.billingService.createUserBill(userBill)
    }

    @Post(':tableBillId/pay-for-all')
    public async payForAllUsers(@Param('tableBillId') tableBillId: string): Promise<TableBill> {
        return this.billingService.payForAllUsers(tableBillId);
    }

    @Post(':tableBillId/:idUser/pay-for-one')
    public async payForOneUser(@Param('tableBillId') tableBillId: string, @Param('idUser') idUser: number): Promise<TableBill> {
        return this.billingService.payForOneUser(tableBillId, idUser);
    }
}
