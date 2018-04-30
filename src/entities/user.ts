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

    public static fromJSON(json: any): User {
        return new User(json.emailAddress, json.firstName, json.id, json.lastName);
    }

}
