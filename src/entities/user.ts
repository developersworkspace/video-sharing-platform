import { IClonable } from '../interfaces/clonable';

export class User implements IClonable<User> {

    constructor(
        public emailAddress: string,
        public firstName: string,
        public id: string,
        public lastName: string,
    ) {

    }

    public clone(): User {
        return new User(this.emailAddress, this.firstName, this.id, this.lastName);
    }

}
