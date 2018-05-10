import { inject, injectable } from 'inversify';
import { OperationResult } from 'majuro';
import { Constants } from '../constants';
import { User } from '../entities/user';
import { IUserRepository } from '../interfaces/user-repository';

@injectable()
export class UserService {

    constructor(
        @inject('IUserRepository')
        protected userRepository: IUserRepository,
    ) {

    }

    public async create(emailAddress: string, user: User): Promise<OperationResult<User>> {
        const result: OperationResult<User> = new OperationResult(null);

        const existingUser: User = await this.userRepository.find(user.emailAddress);

        if (existingUser) {
            result.addMessage(Constants.ERROR_CODES_USER_EXIST, null, `User with email address '${user.emailAddress}' already exist`);

            return result;
        }

        user = await this.userRepository.create(user);

        result.setResult(user);

        return result;
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
            result.addMessage(Constants.ERROR_CODES_UNAUTHORIZED, null, `Not allowed to edit another user`);

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
