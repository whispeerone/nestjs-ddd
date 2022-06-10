import { EntityRepository, Repository } from 'typeorm';
import { v4 as uuidv4 } from "uuid";

import { EventHandlerEntity } from "./event-handler.entity"

@EntityRepository(EventHandlerEntity)
export class EventHandlerRepository extends Repository<EventHandlerEntity> {
	
	async createHandler(handlerName: string, eventType: string) {

		const eventHandler = new EventHandlerEntity();
		eventHandler.name = handlerName;
		eventHandler.eventType = eventType;
		eventHandler.id = uuidv4();

	    const eventHandlerEntity = this.create(eventHandler);
		await this.manager.save(eventHandlerEntity);
	    
		// await eventHandlerEntity.save();
		
	    return eventHandlerEntity.id;
    }

    async getHandler(handlerName: string) {
    	return this.findOne({
    		where: {
    			name : handlerName
    		}
    	})
    }
}

