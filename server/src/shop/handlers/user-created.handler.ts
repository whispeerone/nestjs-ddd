import { Injectable } from "@nestjs/common";

import { UserCreated } from "src/user-management/domain/events/user-created.event";
import { IEventHandler } from "src/shared/ievent-handler";

import { Client } from "../domain/client";
import { ClientRepository } from "../repositories/client.repository";

@Injectable()
export class UserCreatedHandler implements IEventHandler<UserCreated> {

    constructor(private readonly clientRepository: ClientRepository) {

    }

    async handle(event: UserCreated): Promise<void> {

        const existUser = this.clientRepository.findById(event.id);

        if (existUser != null) {
            throw new Error("user aleady created");
        }

        const client = new Client();
        this.clientRepository.create(client);
    }
}
