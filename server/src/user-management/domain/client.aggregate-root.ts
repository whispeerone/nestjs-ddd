import { v4 as uuidv4 } from "uuid";

import { DomainEventDispatcher } from "src/shared/domain-event-dispatcher";
import { IPersistable } from "src/shared/interfaces/ipersistable";
import { AggregateRoot } from "src/shared/aggregate-root";

import { IPhoneNumberUniqueValidator } from "./interfaces/iuniq-phone-number-checker.interface";

import { Address } from "./address.model"
import { PhoneNumber } from "./phone-number"
import { UserCreated } from "./events/user-created.event";
import { ClientState } from "./states/client.state";

export class Client extends AggregateRoot<ClientState> {

    private _id: string;
    private name: string;
    private phoneNumber: PhoneNumber;
    private settings: any;
    private createAt: Date;

    get id() {
        return this._id;
    }

    private constructor() {
        super();
    }

    static async create(phoneNumber: PhoneNumber, validator: IPhoneNumberUniqueValidator): Promise<Client> {

        const isPhoneNumberUnique = await validator.isUnique(phoneNumber.phoneNumber);
        if (!isPhoneNumberUnique) {
            throw new Error("Client with the same phoneNumber is already registered");
        }

        const client = new Client(); 
        client._id = uuidv4();
        client.phoneNumber = phoneNumber;
        client.createAt = new Date();

        const event = new UserCreated();
        event.id = client._id;
        event.createdAt = client.createAt;
        event.phoneNumber = client.phoneNumber.phoneNumber;

        client.addEvent(event);

        return client;
    }

    static fromState(state: ClientState) {
        const client = new Client();

        client._id = state.id;
        client.phoneNumber = new PhoneNumber(state.phoneNumber);
        client.createAt = state.createdAt;
        client.name = state.name;

        return client;
    }

    toState() : ClientState {
        const state = new ClientState(); 

        state.id = this._id;
        state.phoneNumber = this.phoneNumber.phoneNumber;
        state.createdAt = this.createAt;
        state.name = this.name

        return state;
    }
}