import { injectable } from 'inversify';
import { User } from '../entities/user';
import { IUserRepository } from '../interfaces/user-repository';

@injectable()
export class UserService {

    constructor(
        protected userRepository: IUserRepository,
    ) {

    }

    public async find(emailAddress: string): Promise<User> {
        return this.userRepository.find(emailAddress);
    }

}
