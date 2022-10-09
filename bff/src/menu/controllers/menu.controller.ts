import {Controller, Get} from '@nestjs/common';
import {MenuService} from "../services/menu.service";
import {MenuItemServerDto} from "../../shared/dto/menu-item-server.dto";

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) {}


    @Get('')
    public getAllMenu(): Promise<MenuItemServerDto[]> {
        return this.menuService.retrieveAllMenus();
    }


}
