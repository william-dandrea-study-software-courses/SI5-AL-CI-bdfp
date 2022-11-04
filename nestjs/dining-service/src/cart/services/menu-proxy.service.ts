import { Injectable } from '@nestjs/common';
import {MenuItem} from "../../table-orders/schemas/menu-item.schema";
import {ConfigService} from "@nestjs/config";
import {HttpService} from "@nestjs/axios";
import {DependenciesConfig} from "../../shared/config/interfaces/dependencies-config.interface";
import {AxiosResponse} from "axios";
import {firstValueFrom} from "rxjs";
import {OrderingItem} from "../../table-orders/schemas/ordering-item.schema";
import * as _keyBy from 'lodash/keyBy';

@Injectable()
export class MenuProxyService {
    private _baseUrl: string;

    private _menusPath = '/menus';

    private _menuItemsByShortName: Map<string, MenuItem> = null;
    private _menuItemsById: Map<string, MenuItem> = null;

    constructor(private configService: ConfigService, private readonly httpService: HttpService) {
        const dependenciesConfig = this.configService.get<DependenciesConfig>('dependencies');
        this._baseUrl = `http://${dependenciesConfig.menu_service_url_with_port}`;
    }

    private async retrieveFullMenu() {
        if (this._menuItemsByShortName === null) {
            const retrieveFullMenuCallResponse: AxiosResponse<MenuItem[]> = await firstValueFrom(this.httpService.get(`${this._baseUrl}${this._menusPath}`));
            this._menuItemsByShortName = _keyBy(retrieveFullMenuCallResponse.data, 'shortName');
            this._menuItemsById = _keyBy(retrieveFullMenuCallResponse.data, '_id');
        }
    }


    public async isMenuItemIdExist(itemId: string): Promise<boolean> {
        await this.retrieveFullMenu();
        return (this._menuItemsById[itemId] || null) != null;
    }

}
