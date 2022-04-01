import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DomainEventDispatcher } from './shared/domain-event-dispatcher';
import { UserCreated } from './user-management/domain/events/user-created.event';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  DomainEventDispatcher.register<UserCreated>(UserCreated, (x) => console.log("handled"));

  await app.listen(3000);
}
bootstrap();
