import { Module } from "@nestjs/common";

import { ClientController } from "./application/client.controller";
import { ClientService } from "./services/client.service";
import { ClientRepository } from "./repositories/client.repository";

@Module({
    imports: [],
    controllers: [ClientController],
    providers: [ClientService, ClientRepository],
})
export class UserManagementModule {}
