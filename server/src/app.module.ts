import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserManagementModule } from './user-management/user-management.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from 'src/shared/move/event.entity';
import { EventHandlerEntity } from './shared/move/event-handler.entity';
import { EventHandlingStatus } from './shared/move/event-status.entity';
import { EventRepository } from './shared/move/event.repository';
import { ClientEntity } from './user-management/repositories/entities/client.entity';
import { DomainCommonModule } from './shared/domain-common.module';

@Module({
    imports: [
        UserManagementModule,
        TypeOrmModule.forRoot({
                type: 'postgres',
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'admin',
                database: 'ddd2',
                entities: [EventEntity, EventHandlerEntity, EventHandlingStatus, ClientEntity],
                synchronize: true,
            }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
