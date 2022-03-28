import { IUniqPhoneNumberValidator } from "../../domain/interfaces/iuniq-phone-number-checker.interface"
import { ClientRepository } from "../../repositories/client.repository"

export class UniqPhoneNumberValidator implements IUniqPhoneNumberValidator {

	constructor(private readonly clientRepository: ClientRepository) {
	}

	isValid(phoneNumber: string) {
		const clients = this.clientRepository.findAll();
		return !clients.some(x => x._phoneNumber == phoneNumber);
	}
}