import { User } from '../../entities/user';
import { IUserRepository } from '../../interfaces/user-repository';

export class UserRepository implements IUserRepository {

    protected users: User[] = null;

    constructor() {
        this.users = [
            new User('chris@leslingshot.com', 'Chris', 'Ramsay'),
        ];
    }

    public async find(emailAddress: string): Promise<User> {
        return this.users.find((user: User) => user.emailAddress === emailAddress);
    }

}
