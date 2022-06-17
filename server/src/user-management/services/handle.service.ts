import { Injectable } from "@nestjs/common";

import { UserCreated } from "../domain/events/user-created.event";
import { IEventHandler } from "src/shared/ievent-handler";
import { UnitOfWorkCoordinator } from "src/shared/unit-of-work.coordinator";

import { EventRepository } from "src/shared/move/event.repository";
import { EventsHandler } from "src/shared/event-handler.decorator";

@EventsHandler(UserCreated)
@Injectable()
export class HandleService implements IEventHandler<UserCreated> {

    async handle(data: UserCreated): Promise<void> {

        // await this.optionsService.addDefauiltOptions(data.id)

        throw new Error("asas");
    
    }
}
