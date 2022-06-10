import { EventHandlingStatus } from "./event-status.entity"
import { EventEntity } from "./event.entity"
import { EventHandlerEntity } from "./event-handler.entity"
import { EventStatus } from "./event.status"
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(EventHandlingStatus)
export class EventHandlingStatusRepository extends Repository<EventHandlingStatus> {
	
	// async createStatus(eventId: number, handlerId: number) {
	// 	const eventStatus = new EventHandlingStatus();

	// 	eventStatus.event = { id: eventId} as EventEntity;
	// 	eventStatus.handler = { id: handlerId} as EventHandlerEntity;
	// 	eventStatus.status = 0;
	// 	eventStatus.createdAt = new Date();
	// 	eventStatus.modifiedAt = null;
	// 	console.log(eventStatus)
	//     const eventEntity = this.create(eventStatus);
	// 	//await eventEntity.save();

	// 	await this.manager.save(eventEntity);
		
	//     return eventEntity.id;
 //    }

 	async add(domainEventId: string, handlerId: string) {
		const eventStatus = new EventHandlingStatus();

		eventStatus.event = { id: domainEventId} as EventEntity;
		eventStatus.handler = { id: handlerId } as EventHandlerEntity;
		eventStatus.status = EventStatus.Pending; // fix in case of delayed events
		eventStatus.createdAt = new Date();
		eventStatus.modifiedAt = null;

	    const eventEntity = this.create(eventStatus);
		await this.manager.save(eventEntity);
		
	    return eventEntity;
 	}
}