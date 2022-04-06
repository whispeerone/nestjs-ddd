import { Injectable } from "@nestjs/common";

import { DomainEvent } from "./domain-event"
import { Event } from "../user-management/domain/events/event"
import { IEventHandler } from "./ievent-handler"
import { EventEntity } from "./move/event.entity"
import { EventRepository } from "./move/event.repository"
import { EventHandlerRepository } from "./move/event-handler.repository"
import { EventHandlingStatusRepository } from "./move/event-handling-status.repository"
import { Repository } from 'typeorm';

@Injectable()
export class DomainEventDispatcher {

	private handlers: {[key: string]: IEventHandler<Event>[] } = {};

	constructor(
		private readonly eventRepository: EventRepository,
		private readonly eventHandlerRepository: EventHandlerRepository,
		private readonly eventHandlingStatusRepository: EventHandlingStatusRepository
	) {}

	public async register<T>(eventType : new () => T, handler: IEventHandler<T>) {

		if (this.handlers[eventType.name] == null) {
			this.handlers[eventType.name] = []
		}

		const handlerName = handler.constructor.name;

		const handlerEntity = await this.eventHandlerRepository.getHandler(handlerName)

		if (handlerEntity == null) {
			await this.eventHandlerRepository.createHandler(handlerName, eventType.name);
		}

		this.handlers[eventType.name].push(handler);
	}

	public async raise<T extends Event>(event: T) {
		const eventName = event.constructor.name;
		const handlers = this.handlers[eventName];

		for (const handler of handlers) {
			await this.prepareEvent(event, handler);
		}
		

		// for (const handler of handlers) {
		// 	this.handleEvent(event, handler);
		// }
	}

	private async prepareEvent<T>(event: T, handler : IEventHandler<T>) {
		const domainEvent = await this.eventRepository.createEvent(new DomainEvent(event));

		await handler.handle(event);

		await this.eventHandlingStatusRepository.createStatus(domainEvent, 1)

		// domainEvent.status = 1;
		// await domainEvent.save();
	}

	private async handleEvent<T>(event: T, handler : IEventHandler<T>) {
		const domainEvent = await this.eventRepository.createEvent(new DomainEvent(event));

		await handler.handle(event);

		// domainEvent.status = 1;
		// await domainEvent.save();
	}

	private assertDispatcherInitialized() {
		if (this.eventRepository == null) {
			throw new Error("DomainEventDispatcher is not initialized yet");
		}
	}
}