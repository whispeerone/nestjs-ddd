import { EventHandlerEntity } from "./event-handler.entity"
import { DomainEvent } from "../domain-event"
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(EventHandlerEntity)
export class EventHandlerRepository extends Repository<EventHandlerEntity> {
	
	async createHandler(handlerName: string, eventType: string) {

		const eventHandler = new EventHandlerEntity();
		eventHandler.name = handlerName;
		eventHandler.eventType = eventType;

	    const eventHandlerEntity = this.create(eventHandler);

		await eventHandlerEntity.save();
		
	    return eventHandlerEntity.id;
    }

    async getHandler(handlerName: string) {
    	return this.findOne({
    		where: {
    			name : handlerName
    		}
    	})
    }

    bar () {
    	const repo = {} as any;

    	const dutyIds = [1,2,3,4];
    	const dutyEntities = await this.foo(dutyIds: number[], (dutyIds: number[]) => repo.findByIds(dutyIds));

    }


    async foo<T>(entityIds: number[], (entityIds: number[]) => Promise<T[]>) {

    }
}

