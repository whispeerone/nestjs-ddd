import { Injectable } from "@nestjs/common";
import { EntityRepository, Repository } from 'typeorm';

import { Client } from "../domain/client.aggregate-root";
import { ClientEntity } from "./entities/client.entity";

@Injectable()
@EntityRepository(ClientEntity)
export class ClientRepository extends Repository<ClientEntity> {
	
	async add(client: Client) {
		const clientEntity = this.mapToEntity(client);
		await this.manager.save(clientEntity);
	}

	private mapToEntity(client: Client) {
		const entity = new ClientEntity();

		entity.id = client._id;
		entity.name = client.name;
		entity.createdAt = client.createAt;
		entity.phoneNumber = client.phoneNumber;

		return entity;
	}
}