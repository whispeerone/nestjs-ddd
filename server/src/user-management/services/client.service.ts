import { Injectable } from "@nestjs/common";

import { ClientRepository } from "../repositories/client.repository";
import { Client } from "../domain/client.entity";
import { DomainEventDispatcher } from "src/shared/domain-event-dispatcher";
import { UniqPhoneNumberValidator } from "./domain-helpers/uniq-phone-number-checker";
import { UnitOfWorkService } from "./unit-of-work.service";
import { UnitOfWorkCoordinator } from "src/shared/unit-of-work.coordinator";

@Injectable()
export class ClientService {

    constructor(
        private readonly clientRepository: ClientRepository,
        private readonly unitOfWorkService: UnitOfWorkService,
        private readonly unitOfWorkCoordinator: UnitOfWorkCoordinator,
        private readonly domainEventDispatcher: DomainEventDispatcher
    ) {}

    async register(phoneNumber: string): Promise<string> {

        this.unitOfWorkCoordinator.track(this.unitOfWorkService);

        await this.unitOfWorkService.startTransaction();

        try {
            const uniqPhoneValidator = new UniqPhoneNumberValidator(this.clientRepository);
            const client = Client.create(phoneNumber, uniqPhoneValidator);

            this.clientRepository.create(client);
            
            const events = client._events;
            console.log(0)

            await this.domainEventDispatcher.raise(events[0], this.unitOfWorkService.id);
            console.log(1)
            await this.unitOfWorkService.commit();
            console.log(2)

            return client._id;

        } catch(e) {
            await this.unitOfWorkService.rollback();
        }    
    }
}
