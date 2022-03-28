import { Address } from "./address.entity"
import { v4 as uuidv4 } from "uuid";
import { IUniqPhoneNumberValidator } from "./interfaces/iuniq-phone-number-checker.interface";

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

	private constructor() {}

	static create(phoneNumber: string, validator: IUniqPhoneNumberValidator): Client {

		if (!validator.isValid(phoneNumber)) {
			throw new Error("Client with the same phoneNumber is already registered");
		}

		const client = new Client(); 

		client.id = uuidv4();
		client.phoneNumber = phoneNumber;

		return client;
	}
}