import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UnitOfWork } from './unit-of-work';
import { DomainEventDispatcher } from './domain-event-dispatcher';
import { EventHandlerRepository } from './move/event-handler.repository';
import { EventHandlingStatusRepository } from './move/event-handling-status.repository';
import { EventRepository } from './move/event.repository';
import { EventEntity } from './move/event.entity';
import { EventHandlerEntity } from './move/event-handler.entity';
import { EventHandlingStatus } from './move/event-status.entity';

@Module({
    imports: [
    TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'admin',
            database: 'ddd',
            entities: [EventEntity, EventHandlerEntity, EventHandlingStatus],
            synchronize: true,
        }),
    TypeOrmModule.forFeature([EventRepository, EventHandlerRepository, EventHandlingStatusRepository])],
    providers: [UnitOfWork, DomainEventDispatcher, EventHandlerRepository, EventHandlingStatusRepository, EventRepository],
    exports: [UnitOfWork, DomainEventDispatcher]
})
export class DomainCommonModule {}
