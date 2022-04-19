export class Admin {
	
	readonly id: string;
	
	protected constructor() {
	}

	static create() {
		return new Admin();
	}
}