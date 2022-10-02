import { Injectable } from '@nestjs/common';
import {TableServerDto} from "../../dto/table-server.dto";
import {URL_DINING_SERVICE} from "../../../config";
import {PreparationDto, TableOrderServerDto} from "../../dto/table-order-server.dto";
import {HttpService} from "@nestjs/axios";

@Injectable()
export class DiningService {

    constructor(private readonly httpService: HttpService) {}

    private async getTables(): Promise<TableServerDto[]> {
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


    private async postTable(numberOfPersons: number): Promise<TableServerDto> {
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


    private async getTable(tableNumber: number): Promise<TableServerDto> {
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


    private async getTableOrders(): Promise<TableOrderServerDto[]> {
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

    private async postTableOrders(tableNumber: number, customersCount: number): Promise<TableOrderServerDto> {
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

    private async getTableOrder(tableOrderId: number): Promise<TableOrderServerDto> {
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

    private async postTableOrderItem(tableOrderId: number, menuItemId: string, menuItemShortName: string, howMany: number): Promise<TableOrderServerDto> {
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

    private async postTableOrderPrepare(tableOrderId: number): Promise<PreparationDto[]> {
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

    private async postTableOrderBill(tableOrderId: number): Promise<TableOrderServerDto> {
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
