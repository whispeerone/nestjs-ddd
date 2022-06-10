import { IEventHandler } from "./ievent-handler"

export class EventHandlerDescription{
	handler: IEventHandler<object>;
	systemName: string;
	handlerId: string;
}