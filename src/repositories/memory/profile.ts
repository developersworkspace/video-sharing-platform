import { injectable } from 'inversify';
import { Profile } from '../../entities/profile';
import { IProfileRepository } from '../../interfaces/profile-repository';
import { Address } from '../../value-objects/address';
import { ContactDetails } from '../../value-objects/contact-details';
import { SocialDetails } from '../../value-objects/social-details';
import { BaseRepository } from './base';

@injectable()
export class ProfileRepository implements IProfileRepository {

    protected static profiles: Profile[] = [];

    constructor() {
    }

    public async create(profile: Profile): Promise<Profile> {
        const newProfile: Profile = profile.clone();

        newProfile.id = BaseRepository.nextStringId();

        ProfileRepository.profiles.push(newProfile);

        return newProfile;
    }

    public async findById(profileId: string): Promise<Profile> {
        const result: Profile = ProfileRepository.profiles.find((profile: Profile) => profile.id === profileId);

        return result ? result.clone() : null;
    }

    public async findByName(name: string): Promise<Profile> {
        const result: Profile = ProfileRepository.profiles.find((profile: Profile) => profile.name === name);

        return result ? result.clone() : null;
    }

    public async findByUserId(userId: string): Promise<Profile> {
        const result: Profile = ProfileRepository.profiles.find((profile: Profile) => profile.userId === userId);

        return result ? result.clone() : null;
    }

    public async update(profile: Profile): Promise<Profile> {
        const result: Profile = ProfileRepository.profiles.find((x: Profile) => x.id === profile.id);

        result.address = profile.address.clone();
        result.contactDetails = profile.contactDetails.clone();
        result.description = profile.description;
        result.message = profile.message;
        result.name = profile.name;
        result.socialDetails = profile.socialDetails.clone();

        return result.clone();
    }
}
