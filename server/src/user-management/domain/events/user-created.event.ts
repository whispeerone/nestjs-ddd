import { Event } from "./event"

export class UserCreated extends Event {
	id: string;
	createdAt: Date;
	phoneNumber: string;
}