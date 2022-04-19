import { Injectable,Scope } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";

import { ClientRepository } from "../repositories/client.repository";
import { Client } from "../domain/client.entity";
import { EventHandlerRepository } from "src/shared/move/event-handler.repository";
import { DomainEventDispatcher } from "src/shared/domain-event-dispatcher";
import { UniqPhoneNumberValidator } from "./domain-helpers/uniq-phone-number-checker";
import { Connection, EntityManager, QueryRunner } from 'typeorm';

@Injectable({ scope: Scope.TRANSIENT})
export class UnitOfWorkService {

    readonly id: string;

    private repositories: any = {};
    private queryRunner: QueryRunner;

    constructor(private readonly connection: Connection) {
        this.id = uuidv4();
    }

    async startTransaction() {
        this.queryRunner = this.connection.createQueryRunner();

        await this.queryRunner.connect();
        await this.queryRunner.startTransaction();
    }

    getRepository<T>(repositoryType : new () => T) : T{

        const key = repositoryType.name;

        if (this.repositories[key] != null) {
            return this.repositories[key];
        }

        const repository = this.queryRunner.manager.getCustomRepository<T>(repositoryType);

        this.repositories[key] = repository;
        return repository;
    }

    async commit() {
        try{
            await this.queryRunner.commitTransaction();
        } finally {
            await this.queryRunner.release();
        }
    }

    async rollback() {
        try{
            await this.queryRunner.rollbackTransaction();
        } finally {
            await this.queryRunner.release();
        }

    }
}
