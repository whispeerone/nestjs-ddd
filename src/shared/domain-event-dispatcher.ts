import { DomainEvent } from "./domain-event"

export class DomainEventDispatcher {

	private static handlers: any = {};

	static register<T>(x : new () => T, handler: any) {
		console.log(x.name);
		this.handlers = handler;
	}

	static raise<T>(event: T, x : new () => T) {
		const domainEvent = new DomainEvent(event);
		console.log(event.constructor.name);

		this.handlers();
		//todo 
	}
}