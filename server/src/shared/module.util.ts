import { ModulesContainer } from '@nestjs/core/injector/modules-container';
import { ModuleRef } from "@nestjs/core";

import { DomainEventDispatcher } from "src/shared/domain-event-dispatcher";
import { Constants } from "./constants";

// import { plainToClass } from 'class-transformer';

export class ModuleUtil {

    static registerEventHandlers<T>(moduleType: T, moduleRef: ModuleRef, domainEventDispatcher: DomainEventDispatcher) {

        const providers = Reflect.getMetadata('providers', moduleType).values();

        for(const provider of providers) {

            const eventHandlerType = Reflect.getMetadata(Constants.EVENT_HANDLER, provider);
            const eventType = Reflect.getMetadata(Constants.EVENT, provider);

            if (eventHandlerType != null) {
                // var t = {id:1, phoneNumber: '123'};
                // const foo = plainToClass(eventType, t);
                const instance = moduleRef.get(eventHandlerType);

                domainEventDispatcher.register(eventType, instance);
            }
        }
    }
}
