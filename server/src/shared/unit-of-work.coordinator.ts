import { Injectable,Scope } from "@nestjs/common";

import { UnitOfWork } from "./unit-of-work";
@Injectable({ scope: Scope.DEFAULT})
export class UnitOfWorkCoordinator {

    private instanceMap: any = {};


    constructor() {}

    track(uow: UnitOfWork) {
        // this.instanceMap[uow.id] = uow;

        // setTimeout(() => {
        //     //
        // }, 2000);
    }

    getUnitOfWorkInstance(id: string) {

        // if (this.instanceMap[id] == null) {
        //     throw new Error("no such UnitOfWork");
        // }

        // return this.instanceMap[id] as UnitOfWork;
    }
}
