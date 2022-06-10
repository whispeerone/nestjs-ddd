import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserCreatedHandler } from './handlers/user-created.handler';
import { ClientRepository } from './repositories/client.repository';

@Module({
    imports: [
    ],
    providers: [UserCreatedHandler, ClientRepository],
    exports: [UserCreatedHandler]
})
export class ShopModule {}
