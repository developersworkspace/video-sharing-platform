import { injectable } from 'inversify';
import { Profile } from '../../entities/profile';
import { IProfileRepository } from '../../interfaces/profile-repository';
import { Address } from '../../value-objects/address';
import { ContactDetails } from '../../value-objects/contact-details';
import { SocialDetails } from '../../value-objects/social-details';
import { BaseRepository } from './base';

@injectable()
export class ProfileRepository implements IProfileRepository {

    protected static profiles: Profile[] = [
        new Profile(
            new Address('Montreal', 'Canada'),
            new ContactDetails('chris@leslingshot.com', '(000) 000-0000'),
            `I'm a professional magician who regularly uploads videos on magic performance, street magic, tutorials, cardistry and VLOGS! Come check out my channel if you're a beginner, intermediate or advanced magician. There's something for everyone!`,
            'chris-ramsay-profile-id',
            `Chris Ramsay specializes in the deceptive practices. Using techniques he's refined through thousands of hours of practice, he persists in altering your perceived reality. His flare for creativity has thrown him in to the world of deception, where some of his techniques are distributed to practitioners across the globe. At the forefront of today's industry of modern conjuring, Chris is constantly creating new ways to entertain and redefine your idea of magic.`,
            'chris-ramsay',
            new SocialDetails(
                'https://www.facebook.com/deceivingisbelieving',
                'https://www.instagram.com/chrisramsay52',
                'https://twitter.com/chrisramsay52',
            ),
            'chris-ramsay-user-id',
        ),
    ];

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
