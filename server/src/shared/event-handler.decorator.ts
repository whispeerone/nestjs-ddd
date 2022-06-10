import 'reflect-metadata';
import { DomainEvent } from 'src/user-management/domain/events/event';
import { Constants } from './constants';

export const EventsHandler = (events: object): ClassDecorator => {
    return (target: object) => {
        Reflect.defineMetadata(Constants.EVENT_HANDLER, target, target);
        Reflect.defineMetadata(Constants.EVENT, events, target);
    };
};