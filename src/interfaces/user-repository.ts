import { User } from '../entities/user';

export interface IUserRepository {

    create(user: User): Promise<User>;

    find(emailAddress: string): Promise<User>;

    findById(userId: string): Promise<User>;

    update(user: User): Promise<User>;

}
