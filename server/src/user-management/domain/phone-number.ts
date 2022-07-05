export class PhoneNumber {

	get phoneNumber() {
		return this._phoneNumber;
	}

	private _phoneNumber: string;

	constructor(data: string) {
		if (data == null || data.length < 8) {
			throw new Error("not valid phone number")
		}

		this._phoneNumber = data;
	}
}