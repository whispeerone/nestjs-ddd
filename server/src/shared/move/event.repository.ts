import { EventEntity } from "./event.entity"
import { DomainEventModel } from "../domain-event"
import { DomainEvent } from "src/user-management/domain/events/event"
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(EventEntity)
export class EventRepository extends Repository<EventEntity> {
	
	// async createEvent<T>(domainEvent: DomainEventModel<T>) {

	// 	const event = new EventEntity();
		
	// 	event.eventId = domainEvent.id;
	// 	event.payload = JSON.stringify(domainEvent.payload);

	// 	const eventEntity =  this.create(event);
	// 	await this.manager.save(eventEntity)
		
	//     return eventEntity.id;
 //    }

	async addEvent<T>(domainEvent: DomainEvent<T>) {

		const event = new EventEntity();
		
		event.id = domainEvent.id;
		event.payload = JSON.stringify(domainEvent.event);
		event.createdAt = domainEvent.createdAt

		const eventEntity =  this.create(event);
		await this.manager.save(eventEntity)
		
	    return eventEntity.id;
    }
}