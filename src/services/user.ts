import { inject, injectable } from 'inversify';
import { User } from '../entities/user';
import { IUserRepository } from '../interfaces/user-repository';

@injectable()
export class UserService {

    constructor(
        @inject('IUserRepository')
        protected userRepository: IUserRepository,
    ) {

    }

    public async find(emailAddress: string): Promise<User> {
        return this.userRepository.find(emailAddress);
    }

    public async findById(id: string): Promise<User> {
        return this.userRepository.findById(id);
    }

}
