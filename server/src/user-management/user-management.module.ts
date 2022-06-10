import { Module, Type  } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";

import { DomainEventDispatcher } from "src/shared/domain-event-dispatcher";

import { ClientController } from "./application/client.controller";

import { ClientService } from "./services/client.service";
import { HandleService } from "./services/handle.service";

import { ClientRepository } from "./repositories/client.repository";

import { ModulesContainer } from '@nestjs/core/injector/modules-container';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';

import { DomainCommonModule } from 'src/shared/domain-common.module';
import { IEventHandler } from 'src/shared/ievent-handler';
import { ModuleUtil } from 'src/shared/module.util';
import { UserCreated } from "src/user-management/domain/events/user-created.event";
import { Event } from 'src/user-management/domain/events/event';

@Module({
    imports: [DomainCommonModule],
    controllers: [ClientController],
    providers: [ClientService, ClientRepository, HandleService]
})
export class UserManagementModule {

    constructor(private readonly domainEventDispatcher: DomainEventDispatcher, private readonly moduleRef: ModuleRef) {
        ModuleUtil.registerEventHandlers(UserManagementModule, moduleRef, domainEventDispatcher);
    }
}