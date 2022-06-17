import { v4 as uuidv4 } from "uuid";

import { Address } from "./address.model"
import { IPhoneNumberUniqueValidator } from "./interfaces/iuniq-phone-number-checker.interface";
import { DomainEventDispatcher } from "src/shared/domain-event-dispatcher";
import { AggregateRoot } from "src/shared/aggregate-root";
import { UserCreated } from "./events/user-created.event";

export class Client extends AggregateRoot {

	get _id() {
		return this.id;
	}

	get _phoneNumber() {
		return this.phoneNumber;
	}

	private id: string;
	public name: string;
	public phoneNumber: string;
	public settings: any;
	public createAt: Date;

	static async create(phoneNumber: string, validator: IPhoneNumberUniqueValidator): Promise<Client> {

		const isPhoneNumberUnique = await validator.isUnique(phoneNumber);
		if (!isPhoneNumberUnique) {
			throw new Error("Client with the same phoneNumber is already registered");
		}

		const client = new Client(); 

		client.id = uuidv4();
		client.phoneNumber = phoneNumber;
		client.createAt = new Date();

		const event = new UserCreated();
		event.id = client.id;
		event.createdAt = client.createAt;
		event.phoneNumber = client.phoneNumber;

		client.addEvent(event);

		return client;
	}
}