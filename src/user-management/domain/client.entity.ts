import { Address } from "./address.entity"
import { v4 as uuidv4 } from "uuid";
import { IUniqPhoneNumberValidator } from "./interfaces/iuniq-phone-number-checker.interface";
import { DomainEventDispatcher } from "src/shared/domain-event-dispatcher";
import { UserCreated } from "./events/user-created.event";

export class Client {


	get _id() {
		return this.id;
	}

	get _phoneNumber() {
		return this.phoneNumber;
	}

	private id: string;
	private name: string;
	private phoneNumber: string;
	private addresses: Address[];
	private settings: any;
	private createAt: Date;

	private constructor() {}

	static create(phoneNumber: string, validator: IUniqPhoneNumberValidator): Client {

		if (!validator.isValid(phoneNumber)) {
			throw new Error("Client with the same phoneNumber is already registered");
		}

		const client = new Client(); 

		client.id = uuidv4();
		client.phoneNumber = phoneNumber;
		client.createAt = new Date();

		const event: UserCreated = {
			id : client.id,
			createdAt : client.createAt,
			name : client.name
		}

		this.foo(event);

		return client;
	}

	static foo<T>(event: T) {
		DomainEventDispatcher.raise(event, T);		
	}
}