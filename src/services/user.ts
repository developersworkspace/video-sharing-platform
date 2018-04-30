import { inject, injectable } from 'inversify';
import { OperationResult } from 'majuro';
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

    public async update(emailAddress: string, user: User): Promise<OperationResult<User>> {
        const result: OperationResult<User> = new OperationResult(null);

        const existingUser: User = await this.userRepository.findById(user.id);

        if (existingUser.emailAddress !== emailAddress) {
            result.addMessage('unauthorized', null, `Not allowed to edit another user`);

            return result;
        }

        existingUser.emailAddress = user.emailAddress;
        existingUser.firstName = user.firstName;
        existingUser.lastName = user.lastName;

        user = await this.userRepository.update(user);

        result.setResult(user);

        return result;
    }

}
