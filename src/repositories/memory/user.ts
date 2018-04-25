import { User } from '../../entities/user';
import { IUserRepository } from '../../interfaces/user-repository';

export class UserRepository implements IUserRepository {

    protected users: User[] = null;

    constructor() {
        this.users = [
            new User('chris@leslingshot.com', 'Chris', 'chris-ramsay-user-id', 'Ramsay'),
        ];
    }

    public async find(emailAddress: string): Promise<User> {
        return this.users.find((user: User) => user.emailAddress === emailAddress);
    }

    public async findById(id: string): Promise<User> {
        return this.users.find((user: User) => user.id === id);
    }

}
