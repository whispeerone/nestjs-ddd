import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UnitOfWork } from './unit-of-work';
import { DomainEventDispatcher } from './domain-event-dispatcher';
import { EventHandlerRepository } from './move/event-handler.repository';
import { EventHandlingStatusRepository } from './move/event-handling-status.repository';
import { EventRepository } from './move/event.repository';

@Module({
    imports: [TypeOrmModule.forFeature([EventRepository, EventHandlerRepository, EventHandlingStatusRepository])],
    providers: [UnitOfWork, DomainEventDispatcher, EventHandlerRepository, EventHandlingStatusRepository, EventRepository],
    exports: [UnitOfWork, DomainEventDispatcher]
})
export class DomainCommonModule {}
