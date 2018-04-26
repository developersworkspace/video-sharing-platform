import { inject, injectable } from 'inversify';
import { Profile } from '../entities/profile';
import { IProfileRepository } from '../interfaces/profile-repository';

@injectable()
export class ProfileService {

    constructor(
        @inject('IProfileRepository')
        protected profileRepository: IProfileRepository,
    ) {

    }

    public async find(emailAddress: string): Promise<Profile> {
        return this.profileRepository.find(emailAddress);
    }

    public async findByName(emailAddress: string): Promise<Profile> {
        return this.profileRepository.findByName(emailAddress);
    }
}
