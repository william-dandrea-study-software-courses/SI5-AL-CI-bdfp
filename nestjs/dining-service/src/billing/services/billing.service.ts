import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {NewUserBillDto} from "../dto/new-user-bill.dto";
import {NewTableBillDto} from "../dto/new-table-bill.dto";
import {InjectModel} from "@nestjs/mongoose";
import {TableCart, TableCartDocument} from "../../cart/schemas/table-cart.schema";
import {Model} from "mongoose";
import {TableBill, TableBillDocument, UserBills} from "../schemas/user-bill.schema";
import {ErrorDto} from "../../shared/dto/error.dto";

@Injectable()
export class BillingService {

    constructor(@InjectModel(TableBill.name) private tableBillModel: Model<TableBillDocument>,) {}

    public async createTableBill(tableBill: NewTableBillDto): Promise<TableBill> {
        const tableBillMongo: TableBill = new TableBill();
        tableBillMongo.table_number = tableBill.tableNumber;
        tableBillMongo.table_order_id = tableBill.tableOrderId;
        tableBillMongo.user_bills = [];
        tableBillMongo.remaining_amount_to_be_paid = 0;

        return await this.tableBillModel.create(tableBillMongo);
    }

    public async createUserBill(userBill: NewUserBillDto): Promise<UserBills> {
        const currentTable: TableBill = await this.tableBillModel.findOne({_id: userBill.tableBillId});

        if (currentTable) {

            if (currentTable.user_bills.findIndex(v => v.user_id == userBill.userId) >= 0) {
                throw new HttpException(`UserBill ${userBill.userId} already exist`, HttpStatus.UNPROCESSABLE_ENTITY)
            }

            const userBillMongo: UserBills = new UserBills();
            userBillMongo.user_id = userBill.userId;
            userBillMongo.is_paid = false;
            userBillMongo.items_in_cart = userBill.itemsInCart;
            userBillMongo.remaining_amount_to_be_paid = userBill.itemsInCart.map<number>(i => i.price).reduce((a, b) => a+b)

            currentTable.user_bills.push(userBillMongo)

            const result = await this.tableBillModel.findOneAndUpdate({_id: userBill.tableBillId}, {'user_bills': currentTable.user_bills, 'remaining_amount_to_be_paid': currentTable.remaining_amount_to_be_paid + userBillMongo.remaining_amount_to_be_paid});
            if (result) {
                return userBillMongo;
            } else {
                throw new ErrorDto(HttpStatus.UNPROCESSABLE_ENTITY, "Cannot update the database")
            }
        }

        throw new HttpException(`Cannot find tableBilling with the ID ${userBill.tableBillId}`, HttpStatus.UNPROCESSABLE_ENTITY)
    }

    public async payForAllUsers(tableBillId: string): Promise<TableBill> {
        const currentTable: TableBill = await this.tableBillModel.findOne({_id: tableBillId});
        if (currentTable) {

            for (const v of currentTable.user_bills) {
                v.is_paid = true;
                v.remaining_amount_to_be_paid = 0
            }

            return this.tableBillModel.findOneAndUpdate({_id: tableBillId}, {'user_bills': currentTable.user_bills, 'remaining_amount_to_be_paid': 0}, {returnDocument: 'after'});

        }
        throw new HttpException(`Cannot find tableBilling with the ID ${tableBillId}`, HttpStatus.UNPROCESSABLE_ENTITY)
    }

    public async payForOneUser(tableBillId: string, idUser: number): Promise<TableBill> {
        const currentTable: TableBill = await this.tableBillModel.findOne({_id: tableBillId});
        if (currentTable) {

            const indexSelectedUser: number = currentTable.user_bills.findIndex(v => v.user_id == idUser)

            console.log(currentTable.user_bills)
            if (indexSelectedUser < 0) {
                throw new HttpException(`UserBill ${idUser} doesn't exist`, HttpStatus.UNPROCESSABLE_ENTITY)
            }

            currentTable.user_bills[indexSelectedUser].is_paid = true;
            const amountToDecrease: number = currentTable.user_bills[indexSelectedUser].remaining_amount_to_be_paid;
            currentTable.user_bills[indexSelectedUser].remaining_amount_to_be_paid = 0;

            return this.tableBillModel.findOneAndUpdate({_id: tableBillId}, {'user_bills': currentTable.user_bills, 'remaining_amount_to_be_paid': currentTable.remaining_amount_to_be_paid - amountToDecrease}, {returnDocument: 'after'});

        }
        throw new HttpException(`Cannot find tableBilling with the ID ${tableBillId}`, HttpStatus.UNPROCESSABLE_ENTITY)

    }

    public async recoverAllBillings(): Promise<TableBill[]> {
        return this.tableBillModel.find({});
    }

    public async recoverOneBilling(tableBillId: string): Promise<TableBill> {
        return this.tableBillModel.findOne({_id: tableBillId});
    }


    public async billByTableOrderId(tableOrderId: string): Promise<TableBill> {
        return this.tableBillModel.findOne({table_order_id: tableOrderId});
    }
}
