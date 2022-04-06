import { Injectable } from "@nestjs/common";

import { ClientRepository } from "../repositories/client.repository";
import { Client } from "../domain/client.entity";
import { UserCreated } from "../domain/events/user-created.event";
import { UniqPhoneNumberValidator } from "./domain-helpers/uniq-phone-number-checker";
import { IEventHandler } from "src/shared/ievent-handler";

@Injectable()
export class HandleService implements IEventHandler<UserCreated> {

    constructor(private readonly clientRepository: ClientRepository) {
    }

    async handle(data: any): Promise<void> {
        console.log("HandleService_handle")
        console.log(data)
        
    }
}
