import { Injectable } from "@nestjs/common";

import { DomainEventModel } from "./domain-event"
import { DomainEvent } from "../user-management/domain/events/event"
import { IEventHandler } from "./ievent-handler"
import { EventHandlerDescription } from "./models"
import { EventEntity } from "./move/event.entity"
import { EventRepository } from "./move/event.repository"
import { UnitOfWorkCoordinator } from "./unit-of-work.coordinator"
import { UnitOfWork } from "./unit-of-work"
import { EventHandlerRepository } from "./move/event-handler.repository"
import { EventHandlingStatusRepository } from "./move/event-handling-status.repository"
import { Repository,  Connection} from 'typeorm';
import { plainToClass } from 'class-transformer';
import { EventStatus } from "./move/event.status"


@Injectable()
export class DomainEventDispatcher {

	private handlers: Map<string, EventHandlerDescription[]> = new Map();

	private readonly eventRepository: EventRepository;
	private readonly eventHandlerRepository: EventHandlerRepository;
	private readonly eventHandlingStatusRepository: EventHandlingStatusRepository;

	constructor(
		private readonly connection: Connection) {

		this.eventHandlerRepository = connection.getCustomRepository(EventHandlerRepository);
		this.eventRepository = connection.getCustomRepository(EventRepository);
		this.eventHandlingStatusRepository = connection.getCustomRepository(EventHandlingStatusRepository);
	}

	public async register<T extends object>(eventType : new () => T, handler: IEventHandler<T>, moduleName: string) {

		const handlerName = moduleName + "_" + handler.constructor.name;
		const handlerEntity = await this.eventHandlerRepository.getHandler(handlerName)

		let handlerId = handlerEntity?.id;

		if (handlerEntity == null) {
			handlerId = await this.eventHandlerRepository.createHandler(handlerName, eventType.name);
			console.log(`Added to database: ${eventType.name} -> ${handlerName}`)
		}

		if (this.handlers.get(eventType.name) == null) {
			this.handlers.set(eventType.name, []);
		}

		const handlers = this.handlers.get(eventType.name);
		handlers.push({handler, systemName: handlerName, handlerId} as EventHandlerDescription);

		console.log(`Registered: ${eventType.name} -> ${handlerName}`)
	}

	public async retry(eventId: string) {
	}

	public async publish<T extends DomainEvent<object>>(domainEvent: T) {
		const domainEventId = await this.eventRepository.addEvent(domainEvent);

		const eventName = domainEvent._event.constructor.name;
		const handlers = this.handlers.get(eventName);

		if (handlers == null || handlers.length === 0) {
			console.log(`No handler found for ${eventName}`);
			return;
		}

		for (const handler of handlers) {
			this.handleEvent(domainEvent, handler);
		}
	}

	private async handleEvent<T extends DomainEvent<object>>(domainEvent: T, handlerDescription : EventHandlerDescription ) {
		
		const handlingStatus = await this.eventHandlingStatusRepository.add(domainEvent.id, handlerDescription.handlerId);

		try{
			await handlerDescription.handler.handle(domainEvent.event);
			handlingStatus.status = EventStatus.Completed;
			
		} catch(e) {
			handlingStatus.status = EventStatus.Failed;
			console.log(`Error from ${handlerDescription.systemName}`)
			console.log(e) // log exception
		}

		handlingStatus.modifiedAt = new Date();
		await handlingStatus.save(); //todo
	}
}