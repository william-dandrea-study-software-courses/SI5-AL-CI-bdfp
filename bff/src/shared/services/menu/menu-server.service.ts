import { Injectable } from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {URL_MENU_SERVICE} from "../../../config";
import {CategoryEnum, MenuItemServerDto} from "../../dto/menu-item-server.dto";
import {ServerRequestException} from "../../exceptions/server-request.exception";

@Injectable()
export class MenuServerService {
    constructor(private readonly httpService: HttpService) {}

    public async getMenus(): Promise<MenuItemServerDto[]> {
        const url = `${URL_MENU_SERVICE}/menus`
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef
                .get<MenuItemServerDto[]>(url)
                .then(menus => {
                    resolve(menus.data)
                }).catch(error => {
                    console.log(error)
                    throw new ServerRequestException(`Cannot execute request : ${url}`)
            });
        })
    }

    public async postMenus(fullName: string, shortName: string, price: number, category: CategoryEnum, image: string): Promise<MenuItemServerDto> {
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

    public async getMenu(menuItemId: string): Promise<MenuItemServerDto> {
        const url = `${URL_MENU_SERVICE}/menus/${menuItemId}`
        return new Promise((resolve, reject) => {
            this.httpService.axiosRef
                .get<MenuItemServerDto>(url)
                .then(menus => {
                    resolve(menus.data)
                }).catch(error => {
                console.log(error)
                throw new ServerRequestException(`Cannot execute request : ${url}`)
            });
        })
    }
}
