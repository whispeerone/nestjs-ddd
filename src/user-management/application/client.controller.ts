import { Controller, Post, Body } from "@nestjs/common";

import { RegisterClientDto } from "./dto/register-client.dto";
import { ClientService } from "../services/client.service";
import { UnitOfWorkService } from "../services/unit-of-work.service";
import { EventEntity } from "../../shared/move/event.entity";
import { EventRepository } from "../../shared/move/event.repository";

@Controller("client")
export class ClientController {

    constructor(private readonly clientService: ClientService, private readonly unitOfWorkService: UnitOfWorkService) {}

    @Post()
    async register(@Body() dto: RegisterClientDto) {
        return await this.clientService.register(dto.phoneNumber);
    }
}
