export interface IPhoneNumberUniqueValidator {

	isUnique(phoneNumber: string): Promise<boolean>;
} 