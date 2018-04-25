import { User } from '../entities/user';

export interface IUserRepository {

    find(emailAddress: string): Promise<User>;

    findById(id: string): Promise<User>;

}
