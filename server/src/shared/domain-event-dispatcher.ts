import { Injectable } from "@nestjs/common";

import { DomainEventModel } from "./domain-event"
import { Event } from "../user-management/domain/events/event"
import { IEventHandler } from "./ievent-handler"
import { EventEntity } from "./move/event.entity"
import { EventRepository } from "./move/event.repository"
import { UnitOfWorkCoordinator } from "./unit-of-work.coordinator"
import { UnitOfWork } from "./unit-of-work"
import { EventHandlerRepository } from "./move/event-handler.repository"
import { EventHandlingStatusRepository } from "./move/event-handling-status.repository"
import { Repository } from 'typeorm';
import { plainToClass } from 'class-transformer';
@Injectable()
export class DomainEventDispatcher {

	private handlers: {[key: string]: IEventHandler<Event>[] } = {};

	constructor(
		private readonly eventRepository: EventRepository,
		private readonly eventHandlerRepository: EventHandlerRepository,
		private readonly eventHandlingStatusRepository: EventHandlingStatusRepository
	) {}

	public async register<T>(eventType : new () => T, handler: IEventHandler<T>) {

		console.log(`Registered: ${eventType.name} -> ${handler.constructor.name}`)

		if (this.handlers[eventType.name] == null) {
			this.handlers[eventType.name] = []
		}
		// const handlerName = handler.constructor.name;

		// const handlerEntity = await this.eventHandlerRepository.getHandler(handlerName)

		// if (handlerEntity == null) {
		// 	await this.eventHandlerRepository.createHandler(handlerName, eventType.name);
		// }

		this.handlers[eventType.name].push(handler);
	}

	public async retry(eventId: string) {

	}

	public async publish<T extends Event>(event: T) {
		const eventName = event.constructor.name;
		const handlers = this.handlers[eventName];

		for (const handler of handlers) {
			await this.prepareEvent(event, handler);
		}	
	}

	private async prepareEvent<T>(event: T, handler : IEventHandler<T>) {
		// const uow = this.unitOfWorkCoordinator.getUnitOfWorkInstance(uowId);
		// console.log("uow")
		// const repo = uow.getRepository<EventRepository>(EventRepository);
		// console.log("repo")

		// // const repo = this.eventRepository;
		// const domainEvent = await repo.createEvent(new DomainEvent(event));
		// console.log("save")
		// console.log(domainEvent)
		// try {
		// 	const foo = uow.getRepository(EventHandlingStatusRepository);
		// 	await foo.createStatus(domainEvent, 2)
		// } catch (e) {
		// 	console.log(e)
		// }
		// console.log("2222")
		// event["key"] = uow.id;
		// console.log(uow.id)
		await handler.handle(event);


		// domainEvent.status = 1;
		// await domainEvent.save();
	}

	private async handleEvent<T>(event: T, handler : IEventHandler<T>) {
		const domainEvent = new DomainEventModel(event);

		await handler.handle(event);

		// domainEvent.status = 1;
		// await domainEvent.save();
	}

	// private assertDispatcherInitialized() {
	// 	if (this.eventRepository == null) {
	// 		throw new Error("DomainEventDispatcher is not initialized yet");
	// 	}
	// }
}