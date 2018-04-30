import { IClonable } from '../interfaces/clonable';

export class ContactDetails implements IClonable<ContactDetails> {

    constructor(
        public emailAddress: string,
        public phoneNumber: string,
    ) {

    }

    public clone(): ContactDetails {
        return new ContactDetails(this.emailAddress, this.phoneNumber);
    }

}
