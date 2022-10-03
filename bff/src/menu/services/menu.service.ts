import { Injectable } from '@nestjs/common';

@Injectable()
export class MenuService {


    public async retrieveAllMenus(): Promise<any> {
        return {salut: "salut"}
    }



}
