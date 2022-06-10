import 'reflect-metadata';
import { Event } from 'src/user-management/domain/events/event';
import { Constants } from './constants';

export const EventsHandler = (events: Event): ClassDecorator => {
    return (target: object) => {
        Reflect.defineMetadata(Constants.EVENT_HANDLER, target, target);
        Reflect.defineMetadata(Constants.EVENT, events, target);
    };
};