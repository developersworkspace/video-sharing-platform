import { Profile } from '../../entities/profile';
import { IProfileRepository } from '../../interfaces/profile-repository';
import { Address } from '../../value-objects/address';
import { ContactDetails } from '../../value-objects/contact-details';

export class ProfileRepository implements IProfileRepository {

    protected profiles: Profile[] = null;

    constructor() {
        this.profiles = [
            new Profile(
                new Address('Montreal', 'Canada'),
                new ContactDetails('chris@leslingshot.com', '(000) 000-0000'),
                `I'm a professional magician who regularly uploads videos on magic performance, street magic, tutorials, cardistry and VLOGS! Come check out my channel if you're a beginner, intermediate or advanced magician. There's something for everyone!`,
                'chris-ramsay-profile-id',
                `Chris Ramsay specializes in the deceptive practices. Using techniques he's refined through thousands of hours of practice, he persists in altering your perceived reality. His flare for creativity has thrown him in to the world of deception, where some of his techniques are distributed to practitioners across the globe. At the forefront of today's industry of modern conjuring, Chris is constantly creating new ways to entertain and redefine your idea of magic.`,
                'chris-ramsay',
                'chris-ramsay-user-id',
            ),
        ];
    }

    public async find(userId: string): Promise<Profile> {
        return this.profiles.find((profile: Profile) => profile.userId === userId);
    }

    public async findByName(name: string): Promise<Profile> {
        return this.profiles.find((profile: Profile) => profile.name === name);
    }

}
