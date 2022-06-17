import { IPhoneNumberUniqueValidator } from "../../domain/interfaces/iuniq-phone-number-checker.interface"
import { ClientRepository } from "../../repositories/client.repository"

export class PhoneNumberUniqueValidator implements IPhoneNumberUniqueValidator {

	constructor(private readonly clientRepository: ClientRepository) {
	}

	async isUnique(phoneNumber: string) {

		const count = await this.clientRepository.count({
			where : {
				phoneNumber : phoneNumber
			}
		})

		return count === 0;
	}
}