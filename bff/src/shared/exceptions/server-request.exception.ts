import {HttpStatus} from "@nestjs/common";
import {ErrorBff} from "./error";


export class ServerRequestException extends ErrorBff {
    constructor(details: string) {
        super(HttpStatus.BAD_REQUEST, 'Request failed from BFF to main server', `"${details}"`);
    }
}
