import { Injectable } from '@nestjs/common';
import {MenuServerService} from "../../shared/services/menu/menu-server.service";
import {MenuItemServerDto} from "../../shared/dto/menu-item-server.dto";

@Injectable()
export class MenuService {
    constructor(private menuService: MenuServerService) {}

    public async retrieveAllMenus(): Promise<MenuItemServerDto[]> {
        return this.menuService.getMenus()
    }
}
