import { Injectable } from '@nestjs/common';
import {TableServerDto} from "../../dto/table-server.dto";
import {URL_DINING_SERVICE} from "../../../config";
import {PreparationDto, TableOrderServerDto} from "../../dto/table-order-server.dto";
import {HttpService} from "@nestjs/axios";

@Injectable()
export class DiningService {

    constructor(public readonly httpService: HttpService) {}

    public async getTables(): Promise<TableServerDto[]> {
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef
                .get<TableServerDto[]>(`${URL_DINING_SERVICE}/tables`)
                .then(tables => {
                    resolve(tables.data)
                }).catch(error => {
                console.log(error)
                reject(error)
            });
        })
    }


    public async postTable(numberOfPersons: number): Promise<TableServerDto> {
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef
                .post<TableServerDto>(`${URL_DINING_SERVICE}/tables`, {number: numberOfPersons})
                .then(table => {
                    resolve(table.data)
                }).catch(error => {
                reject(error)
            })
        })

    }


    public async getTable(tableNumber: number): Promise<TableServerDto> {
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef
                .get<TableServerDto>(`${URL_DINING_SERVICE}/tables/${tableNumber}`)
                .then(tables => {
                    resolve(tables.data)
                }).catch(error => {
                reject(error)
            });
        })
    }


    public async getTableOrders(): Promise<TableOrderServerDto[]> {
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef
                .get<TableOrderServerDto[]>(`${URL_DINING_SERVICE}/tableOrders`)
                .then(table => {
                    resolve(table.data)
                }).catch(error => {
                reject(error)
            })
        })
    }

    public async postTableOrders(tableNumber: number, customersCount: number): Promise<TableOrderServerDto> {
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef
                .post<TableOrderServerDto>(`${URL_DINING_SERVICE}/tableOrders`, {
                    tableNumber: tableNumber,
                    customersCount: customersCount
                })
                .then(table => {
                    resolve(table.data)
                }).catch(error => {
                reject(error)
            })
        })
    }

    public async getTableOrder(tableOrderId: string): Promise<TableOrderServerDto> {
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef
                .get<TableOrderServerDto>(`${URL_DINING_SERVICE}/tableOrders/${tableOrderId}`)
                .then(table => {
                    resolve(table.data)
                }).catch(error => {
                reject(error)
            })
        })
    }

    public async postTableOrderItem(tableOrderId: string, menuItemId: string, menuItemShortName: string, howMany: number): Promise<TableOrderServerDto> {
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef
                .post<TableOrderServerDto>(`${URL_DINING_SERVICE}/tableOrders/${tableOrderId}`, {
                    menuItemId,
                    menuItemShortName,
                    howMany,
                })
                .then(table => {
                    resolve(table.data)
                }).catch(error => {
                reject(error)
            })
        })
    }

    public async postTableOrderPrepare(tableOrderId: string): Promise<PreparationDto[]> {
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef
                .post<PreparationDto[]>(`${URL_DINING_SERVICE}/tableOrders/${tableOrderId}/prepare`)
                .then(table => {
                    resolve(table.data)
                }).catch(error => {
                reject(error)
            })
        })
    }

    public async postTableOrderBill(tableOrderId: string): Promise<TableOrderServerDto> {
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef
                .post<TableOrderServerDto>(`${URL_DINING_SERVICE}/tableOrders/${tableOrderId}/bill`)
                .then(table => {
                    resolve(table.data)
                }).catch(error => {
                reject(error)
            })
        })
    }


}
