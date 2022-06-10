import { DomainEvent } from "src/user-management/domain/events/event"

export abstract class AggregateRoot {
	
	public events: DomainEvent<object>[] = [];

	protected addEvent<T extends object>(event: T) {
		const domainEvent = new DomainEvent<T>(event);
		this.events.push(domainEvent)
	}
}