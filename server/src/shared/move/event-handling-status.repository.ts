import { EventHandlingStatus } from "./event-status.entity"
import { EventEntity } from "./event.entity"
import { EventHandlerEntity } from "./event-handler.entity"
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(EventHandlingStatus)
export class EventHandlingStatusRepository extends Repository<EventHandlingStatus> {
	
	async createStatus(eventId: number, handlerId: number) {
		const eventStatus = new EventHandlingStatus();

		eventStatus.event = { id: eventId} as EventEntity;
		eventStatus.handler = { id: handlerId} as EventHandlerEntity;
		eventStatus.status = 0;
		eventStatus.createdAt = new Date();
		eventStatus.modifiedAt = null;
		
	    const eventEntity = this.create(eventStatus);
		await eventEntity.save();
		
	    return eventEntity.id;
    }
}