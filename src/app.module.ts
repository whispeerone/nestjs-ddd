import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserManagementModule } from './user-management/user-management.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './shared/move/event.entity';
import { EventHandlerEntity } from './shared/move/event-handler.entity';
import { EventHandlingStatus } from './shared/move/event-status.entity';
import { EventRepository } from './shared/move/event.repository';

@Module({
    imports: [
        UserManagementModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'admin',
            database: 'ddd',
            entities: [EventEntity, EventHandlerEntity, EventHandlingStatus],
            synchronize: true,
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
