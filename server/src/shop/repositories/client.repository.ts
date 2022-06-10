import { Injectable } from "@nestjs/common";

import { Client } from "../domain/client";

@Injectable()
export class ClientRepository {
	
	private clients: Client[] = [];

	findAll() {
		return this.clients;
	}

	findById(id: string) : Client {

		const client = this.clients.find(x => x.id == id)

		if (client == null) {
			throw new Error("No such client"); //todo
		}

		return client;
	}

	create(client: Client) {
		const isClientExist = this.clients.some(x => x.id == client.id);

		if (isClientExist) {
			throw new Error("Client already exists"); //todo
		}

		this.clients.push(client);
	}

	update(client: Client) {
		const isClientExist = this.clients.some(x => x.id == client.id);

		if (!isClientExist) {
			throw new Error("Client don't exists"); //todo
		}

		const clientIndx = this.clients.findIndex(x => x.id == client.id);

		this.clients[clientIndx] = client;
	}
}