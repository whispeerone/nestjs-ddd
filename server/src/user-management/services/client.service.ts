import { Injectable, Scope } from "@nestjs/common";

import { DomainEventDispatcher } from "src/shared/domain-event-dispatcher";
import { UnitOfWork } from "src/shared/unit-of-work";

import { PhoneNumberUniqueValidator } from "./domain-helpers/phone-number-unique.vaidator";

import { ClientRepository } from "../repositories/client.repository";
import { Client } from "../domain/client.aggregate-root";

@Injectable({ scope: Scope.REQUEST})
export class ClientService {

    constructor(
        private readonly unitOfWork: UnitOfWork,
        private readonly domainEventDispatcher: DomainEventDispatcher
    ) {}

    async register(phoneNumber: string): Promise<string> {

        await this.unitOfWork.startTransaction();
        try {
            const clientRepository = this.unitOfWork.getRepository(ClientRepository);
            const uniqPhoneValidator = new PhoneNumberUniqueValidator(clientRepository);
            const client = await Client.create(phoneNumber, uniqPhoneValidator);

            await clientRepository.add(client);

            const events = client._events;
            this.domainEventDispatcher.publishAll(events);

            await this.unitOfWork.commit();

            return client._id;
        } catch(e) {
            await this.unitOfWork.rollback();
            throw e;
        }
    }
}