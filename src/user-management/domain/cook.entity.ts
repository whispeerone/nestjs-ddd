export class Cook {
	
	readonly id: string;
	
	protected constructor() {
	}

	static create() {
		return new Cook();
	}
}