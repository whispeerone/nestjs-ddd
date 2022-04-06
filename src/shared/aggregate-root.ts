


export abstract class AggregateRoot {
	
	private events: any[] = [];


	public publishEvents() {

	}

	protected addEvent<T>(event: T) {
		console.log(event.constructor.name)
	}


}