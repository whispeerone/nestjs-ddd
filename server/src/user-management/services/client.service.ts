import { Injectable, Scope } from "@nestjs/common";

import { DomainEventDispatcher } from "src/shared/domain-event-dispatcher";
import { UnitOfWork } from "src/shared/unit-of-work";

import { UniqPhoneNumberValidator } from "./domain-helpers/uniq-phone-number-checker";

import { ClientRepository } from "../repositories/client.repository";
import { Client } from "../domain/client.entity";

@Injectable({ scope: Scope.REQUEST})
export class ClientService {

    constructor(
        private readonly clientRepository: ClientRepository,
        private readonly unitOfWork: UnitOfWork,
        private readonly domainEventDispatcher: DomainEventDispatcher
    ) {}

    async register(phoneNumber: string): Promise<string> {

        // await this.unitOfWorkService.startTransaction();
        try {
            const uniqPhoneValidator = new UniqPhoneNumberValidator(this.clientRepository);
            const client = Client.create(phoneNumber, uniqPhoneValidator);

            this.clientRepository.create(client);
            
            const events = client._events;

            //this.domainEventDispatcher.publish(events[0], this.unitOfWorkService.id);
            // await this.unitOfWorkService.commit();

            return client._id;

        } catch(e) {
            // await this.unitOfWorkService.rollback();
        }    
    }
}
