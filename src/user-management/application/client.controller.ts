import { Controller, Post, Body } from "@nestjs/common";

import { RegisterClientDto } from "./dto/register-client.dto";
import { ClientService } from "../services/client.service";

@Controller("client")
export class ClientController {

    constructor(private readonly clientService: ClientService) {}

    @Post()
    register(@Body() dto: RegisterClientDto): string {
        return this.clientService.register(dto.phoneNumber);
    }
}
