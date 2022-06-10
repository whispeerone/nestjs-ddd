import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DomainEventDispatcher } from './shared/domain-event-dispatcher';
import { EventRepository } from './shared/move/event.repository';
import { EventEntity } from './shared/move/event.entity';
import { UserCreated } from './user-management/domain/events/user-created.event';
import { HandleService } from './user-management/services/handle.service';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	await app.listen(3000);
}
bootstrap();