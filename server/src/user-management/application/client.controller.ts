import { Controller, Post, Body } from "@nestjs/common";

import { RegisterClientDto } from "./dto/register-client.dto";
import { ClientService } from "../services/client.service";
import { EventEntity } from "../../shared/move/event.entity";
import { EventRepository } from "../../shared/move/event.repository";

import { UniDecorators } from "@unistory/route-decorators";

@UniDecorators.Controller("client")
export class ClientController {

    constructor(private readonly clientService: ClientService) {}

    @Post()
    async register(@Body() dto: RegisterClientDto) {
        return await this.clientService.register(dto.phoneNumber);
    }
}
