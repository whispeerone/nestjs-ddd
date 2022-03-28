export class Cook {
	
	readonly id: string;
	
	private constructor() {
	}

	static create() {
		return new Cook();
	}
}