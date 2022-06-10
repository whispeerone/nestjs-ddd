import { v4 as uuidv4 } from "uuid";

export class DomainEventModel<T> {

	id: string;
	createdAt: Date;
	payload: T;
	status: number;

	constructor(event: T) {
		this.id = uuidv4();
		this.createdAt = new Date();
		this.status = 0;

		this.payload = event;
	}
}