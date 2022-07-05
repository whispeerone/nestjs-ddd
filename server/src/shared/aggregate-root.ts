import { DomainEvent } from "src/user-management/domain/events/event"
import { IPersistable } from "src/shared/interfaces/ipersistable"

export abstract class AggregateRoot<TState> implements IPersistable<TState>{
	
	protected events: DomainEvent<object>[] = [];

	get _events() {
		return [...this.events];
	}

	protected addEvent<T extends object>(event: T) {
		const domainEvent = new DomainEvent<T>(event);
		this.events.push(domainEvent)
	}

	abstract toState(): TState;
}