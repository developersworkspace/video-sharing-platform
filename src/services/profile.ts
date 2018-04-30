import { inject, injectable } from 'inversify';
import { OperationResult } from 'majuro';
import { Profile } from '../entities/profile';
import { User } from '../entities/user';
import { IProfileRepository } from '../interfaces/profile-repository';
import { IUserRepository } from '../interfaces/user-repository';

@injectable()
export class ProfileService {

    constructor(
        @inject('IProfileRepository')
        protected profileRepository: IProfileRepository,
        @inject('IUserRepository')
        protected userRepository: IUserRepository,
    ) {

    }

    public async find(emailAddress: string): Promise<Profile> {
        const user: User = await this.userRepository.find(emailAddress);

        const profile: Profile = await this.profileRepository.find(user.id);

        return profile;
    }

    public async findByName(emailAddress: string): Promise<Profile> {
        return this.profileRepository.findByName(emailAddress);
    }

    public async update(emailAddress: string, profile: Profile): Promise<OperationResult<Profile>> {
        const result: OperationResult<Profile> = new OperationResult(null);

        const user: User = await this.userRepository.find(emailAddress);

        const existingProfile: Profile = await this.profileRepository.findById(profile.id);

        if (existingProfile.userId !== user.id) {
            result.addMessage('unauthorized', null, `Not allowed to edit another user`);

            return result;
        }

        existingProfile.address = profile.address;
        existingProfile.contactDetails = profile.contactDetails;
        existingProfile.description = profile.description;
        existingProfile.message = profile.message;
        existingProfile.name = profile.name;
        existingProfile.socialDetails = profile.socialDetails;

        profile = await this.profileRepository.update(profile);

        result.setResult(profile);

        return result;
    }
}
