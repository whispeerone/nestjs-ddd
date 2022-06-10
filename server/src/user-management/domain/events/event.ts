import { v4 as uuidv4 } from "uuid";

export class DomainEvent<T> {

	readonly createdAt: Date;
	readonly id: string;

	get event() {
		return {...this._event};
	}

	_event: T;

	constructor(event : T) {
		this.id = uuidv4();
		this.createdAt = new Date();
		this._event = event;
	}
}