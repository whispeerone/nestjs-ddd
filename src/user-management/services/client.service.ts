import { Injectable } from "@nestjs/common";

import { ClientRepository } from "../repositories/client.repository";
import { Client } from "../domain/client.entity";
import { DomainEventDispatcher } from "src/shared/domain-event-dispatcher";
import { UniqPhoneNumberValidator } from "./domain-helpers/uniq-phone-number-checker";

@Injectable()
export class ClientService {

    constructor(
        private readonly clientRepository: ClientRepository,
        private readonly domainEventDispatcher: DomainEventDispatcher
    ) {}

    register(phoneNumber: string): string {
        
        const uniqPhoneValidator = new UniqPhoneNumberValidator(this.clientRepository);
        const client = Client.create(phoneNumber, uniqPhoneValidator);

        this.clientRepository.create(client);
        
        const events = client._events;
        this.domainEventDispatcher.raise(events[0]);
        
        return client._id;
    }
}
