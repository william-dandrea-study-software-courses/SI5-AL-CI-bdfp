import { Injectable } from '@nestjs/common';
import { TableDetails } from "../schemas/table-details.schema";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class TableResumeService {
    constructor(private readonly httpService: HttpService) {}

    public async listAllTables(): Promise<TableDetails[]> {
        return [];
    }
}
