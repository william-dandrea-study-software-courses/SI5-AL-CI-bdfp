import { Injectable } from '@nestjs/common';
import { TableDetails } from "../schemas/table-details.schema";
import { HttpService } from "@nestjs/axios";
import {TableServerDto} from "../../shared/dto/table-server.dto";
import {BehaviorSubject} from "rxjs";
import {URL_DINING_SERVICE} from "../../config";
import {PreparationDto, TableOrderServerDto} from "../../shared/dto/table-order-server.dto";

@Injectable()
export class TableResumeService {




    constructor(private readonly httpService: HttpService) {}


    public listTables(): Promise<TableServerDto[]> {
        return null;
    }





}
