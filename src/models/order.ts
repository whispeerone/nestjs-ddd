import * as faker from "faker"

export enum OrderStatus {
	Created = 0,
	CookStarted = 1,
	CookFinished = 2,
	DeliveryStarted = 3,
	Delivered = 4
}

export class Order {
	
	readonly id: string;
	private address: string;
	private pizzaList: string[];
	private deliveryman: string;
	private status: OrderStatus;
	private created: Date;
	private statusDate: Date;

	constructor(address, pizzaList, deliveryman) {
		this.id = faker.random.uuid();
		this.created = new Date();

		this.address = address;
		this.pizzaList = pizzaList;
		this.deliveryman = deliveryman;
		this.status = OrderStatus.Created;
		this.statusDate = new Date();
	}

	changeDeliveryman(deliveryman: string) {
		this.deliveryman = deliveryman;
	}	

	changeAddress(address: string) {
		this.address = address;
	}

	changePizzaList(pizzaList: string[]) {

		const canChanePizzaList = this.status === OrderStatus.Created 
			|| this.status === OrderStatus.CookStarted && true; // todo: diff in min < 10

		if (!canChanePizzaList) {
			throw new Error("can't change pizza list");
		}

		this.pizzaList = pizzaList;
	}
}