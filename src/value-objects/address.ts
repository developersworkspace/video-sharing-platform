import { IClonable } from '../interfaces/clonable';

export class Address implements IClonable<Address> {

    constructor(
        public city: string,
        public country: string,
    ) {

    }

    public clone(): Address {
        return new Address(this.city, this.country);
    }

}
