import { Injectable } from '@nestjs/common';
import {TableServerDto} from "../../dto/table-server.dto";
import {URL_DINING_SERVICE, URL_KITCHEN_SERVICE, URL_MENU_SERVICE} from "../../../config";
import {PreparationDto, TableOrderServerDto} from "../../dto/table-order-server.dto";
import {HttpService} from "@nestjs/axios";
import {MenuItemServerDto} from "../../dto/menu-item-server.dto";
import {
    PostEnum,
    Preparation,
    PreparationRequest,
    PreparedItem,
    Recipe,
    StatePreparation
} from "../../dto/kitchen-server.dto";

@Injectable()
export class KitchenService {
    constructor(private readonly httpService: HttpService) {}


    // The preparations filtered by state and/or table number.
    private async getPreparations(tableNumber: number, statePreparation: StatePreparation): Promise<Preparation[]> {
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef
                .get<Preparation[]>(`${URL_KITCHEN_SERVICE}/preparations?tableNumber=${tableNumber}&state=${statePreparation}`)
                .then(preparations => {
                    resolve(preparations.data)
                }).catch(error => {
                console.log(error)
                reject(error)
            });
        })
    }


    // The new preparations corresponding to items sent to cook.
    private async postPreparations(tableNumber: number, itemToBeCooked: PreparationRequest[]): Promise<Preparation[]> {
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef
                .post<Preparation[]>(`${URL_KITCHEN_SERVICE}/preparations`, {
                    tableNumber: tableNumber,
                    itemsToBeCooked: itemToBeCooked
                })
                .then(preparations => {
                    resolve(preparations.data)
                }).catch(error => {
                console.log(error)
                reject(error)
            });
        })
    }


    // The searched preparation.
    private async getPreparation(preparationId: number): Promise<Preparation> {
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef
                .get<Preparation>(`${URL_KITCHEN_SERVICE}/preparations/${preparationId}`)
                .then(preparations => {
                    resolve(preparations.data)
                }).catch(error => {
                console.log(error)
                reject(error)
            });
        })
    }

    // The preparation has been successfully declared as brought to the table.
    private async postPreparationTakenToTable(preparationId: number): Promise<Preparation> {
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef
                .post<Preparation>(`${URL_KITCHEN_SERVICE}/preparations/${preparationId}`)
                .then(preparations => {
                    resolve(preparations.data)
                }).catch(error => {
                console.log(error)
                reject(error)
            });
        })
    }


    // The searched prepared item.
    private async getPreparedItem(preparedItemId: number): Promise<PreparedItem> {
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef
                .get<PreparedItem>(`${URL_KITCHEN_SERVICE}/preparedItems/${preparedItemId}`)
                .then(preparedItems => {
                    resolve(preparedItems.data)
                }).catch(error => {
                console.log(error)
                reject(error)
            });
        })
    }

    // The searched prepared item's recipe.
    private async getPreparedItemsRecipe(preparedItemId: number): Promise<Recipe> {
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef
                .get<Recipe>(`${URL_KITCHEN_SERVICE}/preparedItems/${preparedItemId}/recipe`)
                .then(preparedItems => {
                    resolve(preparedItems.data)
                }).catch(error => {
                console.log(error)
                reject(error)
            });
        })
    }

    // All items to start cooking now for the requested post.
    private async getPreparedItems(post: PostEnum): Promise<PreparedItem[]> {
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef
                .get<PreparedItem[]>(`${URL_KITCHEN_SERVICE}/preparedItems?post=${post}`)
                .then(preparedItems => {
                    resolve(preparedItems.data)
                }).catch(error => {
                console.log(error)
                reject(error)
            });
        })
    }


    // All items to start cooking now for the requested post.
    private async postStartPrepareItem(preparedItemId: number): Promise<PreparedItem> {
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef
                .post<PreparedItem>(`${URL_KITCHEN_SERVICE}/preparedItems/${preparedItemId}/start`)
                .then(preparedItems => {
                    resolve(preparedItems.data)
                }).catch(error => {
                console.log(error)
                reject(error)
            });
        })
    }

    private async postFinishPrepareItem(preparedItemId: number): Promise<PreparedItem> {
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef
                .post<PreparedItem>(`${URL_KITCHEN_SERVICE}/preparedItems/${preparedItemId}/finish`)
                .then(preparedItems => {
                    resolve(preparedItems.data)
                }).catch(error => {
                console.log(error)
                reject(error)
            });
        })
    }
}
