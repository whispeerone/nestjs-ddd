import { Injectable } from "@nestjs/common";

import { DomainEvent } from "./domain-event"
import { Event } from "../user-management/domain/events/event"
import { IEventHandler } from "./ievent-handler"
import { EventEntity } from "./move/event.entity"
import { EventRepository } from "./move/event.repository"
import { UnitOfWorkCoordinator } from "./unit-of-work.coordinator"
import { UnitOfWorkService } from "src/user-management/services/unit-of-work.service"
import { EventHandlerRepository } from "./move/event-handler.repository"
import { EventHandlingStatusRepository } from "./move/event-handling-status.repository"
import { Repository } from 'typeorm';

@Injectable()
export class DomainEventDispatcher {

	private handlers: {[key: string]: IEventHandler<Event>[] } = {};

	constructor(
		private readonly eventRepository: EventRepository,
		private readonly unitOfWorkCoordinator: UnitOfWorkCoordinator,
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

	public async raise<T extends Event>(event: T, uowId: string) {
		const eventName = event.constructor.name;
		const handlers = this.handlers[eventName];

		for (const handler of handlers) {
			await this.prepareEvent(event, handler, uowId);
		}
		
	}

	private async prepareEvent<T>(event: T, handler : IEventHandler<T>, uowId: string) {
		const uow = this.unitOfWorkCoordinator.getUnitOfWorkInstance(uowId);
		console.log("uow")
		const repo = uow.getRepository<EventRepository>(EventRepository);
		console.log("repo")

		// const repo = this.eventRepository;
		const domainEvent = await repo.createEvent(new DomainEvent(event));
		console.log("save")
		console.log(domainEvent)

		// await this.eventHandlingStatusRepository.createStatus(domainEvent, 1)
		console.log("2222")
		event["key"] = uow.id;
		console.log(uow.id)
		await handler.handle(event);


		// domainEvent.status = 1;
		// await domainEvent.save();
	}

	// private async handleEvent<T>(event: T, handler : IEventHandler<T>) {
	// 	const domainEvent = await this.eventRepository.createEvent(new DomainEvent(event));

	// 	await handler.handle(event);

	// 	// domainEvent.status = 1;
	// 	// await domainEvent.save();
	// }

	// private assertDispatcherInitialized() {
	// 	if (this.eventRepository == null) {
	// 		throw new Error("DomainEventDispatcher is not initialized yet");
	// 	}
	// }
}