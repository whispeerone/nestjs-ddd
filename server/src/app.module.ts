import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserManagementModule } from './user-management/user-management.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEntity } from './shared/move/event.entity';
import { EventHandlerEntity } from './shared/move/event-handler.entity';
import { EventHandlingStatus } from './shared/move/event-status.entity';
import { EventRepository } from './shared/move/event.repository';
import { DomainCommonModule } from './shared/domain-common.module';

@Module({
    imports: [
        UserManagementModule
        
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
