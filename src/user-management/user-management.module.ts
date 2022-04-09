import { Module } from "@nestjs/common";

import { ClientController } from "./application/client.controller";

import { ClientService } from "./services/client.service";
import { UnitOfWorkService } from "./services/unit-of-work.service";
import { UnitOfWorkCoordinator } from "src/shared/unit-of-work.coordinator";
import { HandleService } from "./services/handle.service";

import { ClientRepository } from "./repositories/client.repository";
import { DomainEventDispatcher } from "src/shared/domain-event-dispatcher";

import { EventRepository } from 'src/shared/move/event.repository';
import { EventHandlerRepository } from 'src/shared/move/event-handler.repository';
import { EventHandlingStatusRepository } from 'src/shared/move/event-handling-status.repository';

import { EventEntity } from 'src/shared/move/event.entity';

import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forFeature([EventRepository, EventHandlerRepository, EventHandlingStatusRepository])
    ],
    controllers: [ClientController],
    providers: [ClientService, ClientRepository, HandleService, DomainEventDispatcher, UnitOfWorkService, UnitOfWorkCoordinator]
})
export class UserManagementModule {}
