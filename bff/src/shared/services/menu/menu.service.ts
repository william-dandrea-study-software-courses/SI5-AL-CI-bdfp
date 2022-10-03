import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {URL_MENU_SERVICE} from "../../../config";
import {CategoryEnum, MenuItemServerDto} from "../../dto/menu-item-server.dto";

@Injectable()
export class MenuService {
    constructor(private readonly httpService: HttpService) {}

    private async getMenus(): Promise<MenuItemServerDto[]> {
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef
                .get<MenuItemServerDto[]>(`${URL_MENU_SERVICE}/menus`)
                .then(menus => {
                    resolve(menus.data)
                }).catch(error => {
                console.log(error)
                reject(error)
            });
        })
    }

    private async postMenus(fullName: string, shortName: string, price: number, category: CategoryEnum, image: string): Promise<MenuItemServerDto> {
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef
                .post<MenuItemServerDto>(`${URL_MENU_SERVICE}/menus`, {
                    fullName: fullName,
                    shortName: shortName,
                    price: price,
                    category: category,
                    image: image,
                })
                .then(menus => {
                    resolve(menus.data)
                }).catch(error => {
                console.log(error)
                reject(error)
            });
        })
    }

    private async getMenu(menuItemId: number): Promise<MenuItemServerDto> {
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef
                .get<MenuItemServerDto>(`${URL_MENU_SERVICE}/menus/${menuItemId}`)
                .then(menus => {
                    resolve(menus.data)
                }).catch(error => {
                console.log(error)
                reject(error)
            });
        })
    }
}
