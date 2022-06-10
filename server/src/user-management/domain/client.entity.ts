import { Address } from "./address.entity"
import { v4 as uuidv4 } from "uuid";
import { IUniqPhoneNumberValidator } from "./interfaces/iuniq-phone-number-checker.interface";
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

	get _events() {
		return [...this.events];
	}

	private id: string;
	private name: string;
	private phoneNumber: string;
	private addresses: Address[];
	private settings: any;
	private createAt: Date;

	static create(phoneNumber: string, validator: IUniqPhoneNumberValidator): Client {

		if (!validator.isValid(phoneNumber)) {
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

		client.addEvent(event)

		return client;
	}
}