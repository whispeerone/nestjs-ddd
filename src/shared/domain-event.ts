import { v4 as uuidv4 } from "uuid";

export class DomainEvent<T> {

	id: string;
	createdAt: Date;
	payload: T;

	constructor(event: T) {
		this.id = uuidv4();
		this.createdAt = new Date();

		this.payload = event;
	}
}