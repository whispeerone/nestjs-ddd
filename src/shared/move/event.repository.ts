import { EventEntity } from "./event.entity"
import { DomainEvent } from "../domain-event"
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(EventEntity)
export class EventRepository extends Repository<EventEntity> {
	
	async createEvent<T>(domainEvent: DomainEvent<T>) {

		const event = new EventEntity();
		
		event.eventId = domainEvent.id;
		event.payload = JSON.stringify(domainEvent.payload);

	    const eventEntity = this.create(event);

		await eventEntity.save();
		
	    return eventEntity.id;
    }
}