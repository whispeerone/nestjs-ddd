import { DomainEvent } from "src/user-management/domain/events/event"

export abstract class AggregateRoot {
	
	protected events: DomainEvent<object>[] = [];

	get _events() {
		return [...this.events];
	}

	protected addEvent<T extends object>(event: T) {
		const domainEvent = new DomainEvent<T>(event);
		this.events.push(domainEvent)
	}
}