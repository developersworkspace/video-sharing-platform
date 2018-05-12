import { inject, injectable } from 'inversify';
import * as mongo from 'mongodb';
import { User } from '../../entities/user';
import { IUserRepository } from '../../interfaces/user-repository';
import { BaseRepository } from './base';

@injectable()
export class UserRepository implements IUserRepository {

    constructor(
        @inject('BaseRepository')
        protected baseRepository: BaseRepository,
    ) {
    }

    public async create(user: User): Promise<User> {
        const newUser: User = user.clone();

        if (!user.id) {
            newUser.id = await this.baseRepository.nextStringId();
        }

        const collection: mongo.Collection = await this.baseRepository.getCollection('users');

        await collection.insertOne({
            emailAddress: newUser.emailAddress,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            stringId: newUser.id,
        });

        return newUser;
    }

    public async findByEmailAddress(emailAddress: string): Promise<User> {
        const collection: mongo.Collection = await this.baseRepository.getCollection('users');

        const result: any = await collection.findOne({
            emailAddress,
        });

        return result ? new User(result.emailAddress, result.firstName, result.stringId, result.lastName) : null;
    }

    public async findById(userId: string): Promise<User> {
        const collection: mongo.Collection = await this.baseRepository.getCollection('users');

        const result: any = await collection.findOne({
            stringId: userId,
        });

        return result ? new User(result.emailAddress, result.firstName, result.stringId, result.lastName) : null;
    }

    public async update(user: User): Promise<User> {
        const existingUser: User = await this.findById(user.id);

        existingUser.emailAddress = user.emailAddress;
        existingUser.firstName = user.firstName;
        existingUser.lastName = user.lastName;

        const collection: mongo.Collection = await this.baseRepository.getCollection('users');

        await collection.replaceOne({
            stringId: existingUser.id,
        }, {
                emailAddress: existingUser.emailAddress,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                stringId: existingUser.id,
            });

        return existingUser;
    }

}
