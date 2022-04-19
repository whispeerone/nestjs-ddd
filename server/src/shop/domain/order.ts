import * as faker from "faker"
import { Client } from "./client"

export enum OrderStatus {
	Deleted = -1,
	Created = 0,
	WaitingForCooking = 1
}

export class Order {
	
	private id: string;
	private address: string;
	private pizzaList: string[];
	private status: OrderStatus;
	private created: Date;
	private clientId: string;

	static create(client: Client) {
		const order = new Order();

		order.id = faker.random.uuid();
		order.created = new Date();
		//order.clientId = client.id;

		return order;
	}

	changeAddress(address: string) {
		this.address = address;
	}

}