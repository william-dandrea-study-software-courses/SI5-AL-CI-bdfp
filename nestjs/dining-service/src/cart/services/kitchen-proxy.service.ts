import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";
import {HttpService} from "@nestjs/axios";
import {DependenciesConfig} from "../../shared/config/interfaces/dependencies-config.interface";

@Injectable()
export class KitchenProxyService {
    private _baseUrl: string;



    constructor(private configService: ConfigService, private readonly httpService: HttpService) {
        const dependenciesConfig = this.configService.get<DependenciesConfig>('dependencies');
        this._baseUrl = `http://${dependenciesConfig.kitchen_service_url_with_port}`;
    }



}
