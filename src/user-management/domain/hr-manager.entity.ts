export class HRManager {
	
	readonly id: string;
	
	protected constructor() {
	}

	static create() {
		return new HRManager();
	}
}