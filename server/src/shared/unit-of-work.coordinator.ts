import { Injectable,Scope } from "@nestjs/common";

import { UnitOfWorkService } from "src/user-management/services/unit-of-work.service";
@Injectable({ scope: Scope.DEFAULT})
export class UnitOfWorkCoordinator {

    private instanceMap: any = {};


    constructor() {}

    track(uow: UnitOfWorkService) {
        this.instanceMap[uow.id] = uow;

        setTimeout(() => {
            //
        }, 2000);
    }

    getUnitOfWorkInstance(id: string): UnitOfWorkService {

        if (this.instanceMap[id] == null) {
            throw new Error("no such UnitOfWork");
        }

        return this.instanceMap[id] as UnitOfWorkService;
    }
}
