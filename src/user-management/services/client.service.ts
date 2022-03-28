import { Injectable } from "@nestjs/common";

import { ClientRepository } from "../repositories/client.repository";
import { Client } from "../domain/client.entity";
import { UniqPhoneNumberValidator } from "./domain-helpers/uniq-phone-number-checker";

@Injectable()
export class ClientService {

    constructor(private readonly clientRepository: ClientRepository) {

    }

    register(phoneNumber: string): string {
        
        const uniqPhoneValidator = new UniqPhoneNumberValidator(this.clientRepository);

        const client = Client.create(phoneNumber, uniqPhoneValidator);

        this.clientRepository.create(client);
        
        return client._id;
    }
}
