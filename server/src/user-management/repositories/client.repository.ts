import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from 'typeorm';

import { Client } from "../domain/client.aggregate-root";
import { ClientEntity } from "./entities/client.entity";

@EntityRepository(ClientEntity)
export class ClientRepository extends Repository<ClientEntity> {
	
	async add(client: Client) {
		const clientEntity = this.mapToEntity(client);

		console.log("clientEntity")
		console.log(clientEntity)

		await this.manager.save(clientEntity);
	}

	private mapToEntity(client: Client) {
		const entity = this.manager.create(ClientEntity);

		const state = client.toState();

		entity.id = state.id;
		entity.name = state.name;
		entity.createdAt = state.createdAt;
		entity.phoneNumber = state.phoneNumber;

		return entity;
	}
}