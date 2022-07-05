import { Injectable, Scope } from "@nestjs/common";
import { Connection, QueryRunner, Repository, ObjectLiteral } from 'typeorm';
import { v4 as uuidv4 } from "uuid";

@Injectable({ scope: Scope.TRANSIENT})
export class UnitOfWork {

    private _cachedRepositories: Map<string, Repository<ObjectLiteral>> = new Map();
    private _queryRunner: QueryRunner;

    private _watchdogTimeout: NodeJS.Timeout;
    private readonly _defaultTimeout = 1000 * 100; // 10 sec

    constructor(private readonly connection: Connection) {}

    async startTransaction() {
        this._queryRunner = this.connection.createQueryRunner();

        await this._queryRunner.connect();
        await this._queryRunner.startTransaction();

        this._watchdogTimeout = setTimeout(()=> {
            if (this._queryRunner.isTransactionActive) {
                console.log("_watchdogTimeout")

                this.rollback();
            }

        }, this._defaultTimeout);
    }

    getRepository<T extends Repository<ObjectLiteral>>(repositoryType : new () => T) : T{

        const key = repositoryType.name; 
        const cachedRepository = this._cachedRepositories.get(key);

        if (cachedRepository != null) {
            return cachedRepository as T;
        }

        const repository = this._queryRunner.manager.getCustomRepository<T>(repositoryType);
        this._cachedRepositories.set(key, repository);

        return repository;
    }

    async commit() {

        this.removeTimer();

        try{
            await this._queryRunner.commitTransaction();
        } finally {
            await this._queryRunner.release();
        }
    }

    async rollback() {
        this.removeTimer();

        try{
            await this._queryRunner.rollbackTransaction();
        } finally {
            await this._queryRunner.release();
        }
    }

    private removeTimer() {
        clearTimeout(this._watchdogTimeout);
    }
}
