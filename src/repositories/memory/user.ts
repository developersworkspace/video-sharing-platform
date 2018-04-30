import { injectable } from 'inversify';
import { User } from '../../entities/user';
import { IUserRepository } from '../../interfaces/user-repository';

@injectable()
export class UserRepository implements IUserRepository {

    protected static users: User[] = [
        new User('chris@leslingshot.com', 'Chris', 'chris-ramsay-user-id', 'Ramsay'),
    ];

    constructor() {
    }

    public async find(emailAddress: string): Promise<User> {
        const result: User = UserRepository.users.find((user: User) => user.emailAddress === emailAddress);

        return result ? result.clone() : null;
    }

    public async findById(id: string): Promise<User> {
        const result: User = UserRepository.users.find((user: User) => user.id === id);

        return result ? result.clone() : null;
    }

    public async update(user: User): Promise<User> {
        const result: User = UserRepository.users.find((x: User) => x.id === user.id);

        result.emailAddress = user.emailAddress;
        result.firstName = user.firstName;
        result.lastName = user.lastName;

        return result.clone();
    }

}
