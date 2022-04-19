import { Injectable } from "@nestjs/common";

import { ClientRepository } from "../repositories/client.repository";
import { Client } from "../domain/client.entity";
import { UserCreated } from "../domain/events/user-created.event";
import { UniqPhoneNumberValidator } from "./domain-helpers/uniq-phone-number-checker";
import { IEventHandler } from "src/shared/ievent-handler";
import { UnitOfWorkCoordinator } from "src/shared/unit-of-work.coordinator";
import { EventEntity } from "src/shared/move/event.entity";
import { EventRepository } from "src/shared/move/event.repository";

@Injectable()
export class HandleService implements IEventHandler<UserCreated> {

    constructor(private readonly clientRepository: ClientRepository, private readonly unitOfWorkCoordinator: UnitOfWorkCoordinator) {
    }

    async handle(data: any): Promise<void> {

        const uow = this.unitOfWorkCoordinator.getUnitOfWorkInstance(data.key);

        const repo = uow.getRepository(EventRepository);

        await repo.createEvent({ id: "123", createdAt: new Date(), payload :" azaz", status: 1});

        console.log("HandleService_handle")
        console.log(data)
        throw new Error("asas");
    }
}
