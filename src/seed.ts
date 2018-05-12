import { Profile } from './entities/profile';
import { User } from './entities/user';
import { Video } from './entities/video';
import { IProfileRepository } from './interfaces/profile-repository';
import { IUserRepository } from './interfaces/user-repository';
import { IVideoRepository } from './interfaces/video-repository';
import { container } from './ioc';
import { Address } from './value-objects/address';
import { ContactDetails } from './value-objects/contact-details';
import { SocialDetails } from './value-objects/social-details';

export async function seed(): Promise<void> {

    const users: User[] = [
        new User('chris@leslingshot.com', 'Chris', 'chris-ramsay-user-id', 'Ramsay'),
        new User('alecsteeletools@gmail.com', 'Alec', 'alec-steele-user-id', 'Steele'),
        new User('bramtyjuliette@gmail.com', 'Bramty', 'bramty-juliette-user-id', 'Juliette'),
    ];

    const userRepository: IUserRepository = container.get<IUserRepository>('IUserRepository');

    for (const user of users) {
        const existingUser: User = await userRepository.findByEmailAddress(user.emailAddress);

        if (!existingUser) {
            await userRepository.create(user);
        }
    }

    const profiles: Profile[] = [
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
        new Profile(
            new Address('Norwich', 'United Kingdom'),
            new ContactDetails('alecsteeletools@gmail.com', '+44.7769201464'),
            // tslint:disable-next-line:max-line-length
            `My name's Alec Steele and here you'll find near-daily videos documenting the process of building some awesome projects here in the shop. As a blacksmith, most of the projects start as lumps of steel, or stacks of different alloys for making damascus, that I forge out into blades, sculpture, art or tools before taking the project to the machining equipment or into the grinding room for finishing. Each project teaches me a lot and stretches the bounds of my knowledge. I make a lot of mistakes but they serve as an excellent teacher. There's always something important for me to learn in the shop!`,
            'alec-steele-profile-id',
            `I want my work to be the spark that ignites the desire for you to get into your shop (or kitchen/basement/garage) and make something too! Whether it's stitching a leather wallet or forging a giant sword, you'll love the creative process.`,
            'alec-steele',
            new SocialDetails(
                'https://www.facebook.com/alecsteeleblacksmith',
                'https://www.instagram.com/alecsteele',
                'https://twitter.com/alecsteelesteel',
            ),
            'alec-steele-user-id',
        ),
        new Profile(
            new Address('', 'United States'),
            new ContactDetails('bramtyjuliette@gmail.com', '(000) 000-0000'),
            `Our vlogs will show you the real life of a young married couple who happen to be teen parents. From laughter to fights. Accomplishments to struggles. Follow our journey!`,
            'the-bramfam-profile-id',
            `Our vlogs will show you the real life of a young married couple who happen to be teen parents. From laughter to fights. Accomplishments to struggles. Follow our journey!`,
            'the-bramfam',
            new SocialDetails(
                '',
                'https://www.instagram.com/bramty',
                'https://twitter.com/bramtyjuliettel',
            ),
            'bramty-juliette-user-id',
        ),
    ];

    const profileRepository: IProfileRepository = container.get<IProfileRepository>('IProfileRepository');

    for (const profile of profiles) {
        const existingProfile: Profile = await profileRepository.findByName(profile.name);

        if (!existingProfile) {
            await profileRepository.create(profile);
        }
    }

    const videos: Video[] = [
        new Video(
            'video-1.file',
            new Date(),
            'chris-ramsay-video-id-1',
            // tslint:disable-next-line:max-line-length
            `In today's video, I get stumped by an impossible puzzle, I see impossible magic and hang out with the master of impossible things, consultant to David Blaine and all around generous and humble human being, Garrett Thomas! Garrett lectured last night and I caught some of it on video! Enjoy and Go follow GT!`,
            'chris-ramsay',
            // tslint:disable-next-line:max-line-length
            `In today's video, I get stumped by an impossible puzzle, I see impossible magic and hang out with the master of impossible things, consultant to David Blaine and all around generous and humble human being, Garrett Thomas! Garrett lectured last night and I caught some of it on video! Enjoy and Go follow GT!`,
            74338401,
            'thumbnail-1.file',
            'An IMPOSSIBLE Puzzle and UNEXPLAINABLE Magic!!'),
        new Video(
            'video-2.file',
            new Date(),
            'chris-ramsay-video-id-2',
            // tslint:disable-next-line:max-line-length
            `Today I'm going to attempt to solve this level 9 Viking puzzle, hand made by Jean-Claude Constantin. It is a sequential puzzle where the aim is to slide out the piece holding the top together.`,
            'chris-ramsay',
            // tslint:disable-next-line:max-line-length
            `Today I'm going to attempt to solve this level 9 Viking puzzle, hand made by Jean-Claude Constantin. It is a sequential puzzle where the aim is to slide out the piece holding the top together.`,
            74338401,
            'thumbnail-2.file',
            'Solving the GENIUS Viking Puzzle'),
        new Video(
            'video-3.file',
            new Date(),
            'chris-ramsay-video-id-3',
            // tslint:disable-next-line:max-line-length
            `YO! Today I decided to go out and perform some magic in the streets...`,
            'chris-ramsay',
            `YO! Today I decided to go out and perform some magic in the streets...`,
            74338401,
            'thumbnail-3.file',
            'A Demonstration of MIND CONTROL'),
        new Video(
            'video-4.file',
            new Date(),
            'alec-steele-video-id-4',
            // tslint:disable-next-line:max-line-length
            `My name is Alec Steele and I am a 20 year old blacksmith from Norfolk in the United Kingdom. I upload a vlog from my day at the workshop almost every single day. Lots of sparks, lots of making, lots of fantastic-ness. Great to have you here following along!`,
            'alec-steele',
            `My name is Alec Steele and I am a 20 year old blacksmith from Norfolk in the United Kingdom. I upload a vlog from my...`,
            74338401,
            'thumbnail-4.file',
            'MAKING A DAMASCUS 3D PRINTED KNIFE!!! Part 2'),
        new Video(
            'video-5.file',
            new Date(),
            'alec-steele-video-id-5',
            // tslint:disable-next-line:max-line-length
            `My name is Alec Steele and I am a 20 year old blacksmith from Norfolk in the United Kingdom. I upload a vlog from my day at the workshop almost every single day. Lots of sparks, lots of making, lots of fantastic-ness. Great to have you here following along!`,
            'alec-steele',
            `My name is Alec Steele and I am a 20 year old blacksmith from Norfolk in the United Kingdom. I upload a vlog from my...`,
            74338401,
            'thumbnail-5.file',
            'MAKING A DAMASCUS 3D PRINTED KNIFE!!! Part 1'),
        new Video(
            'video-6.file',
            new Date(),
            'alec-steele-video-id-6',
            // tslint:disable-next-line:max-line-length
            `My name is Alec Steele and I am a 20 year old blacksmith from Norfolk in the United Kingdom. I upload a vlog from my day at the workshop almost every single day. Lots of sparks, lots of making, lots of fantastic-ness. Great to have you here following along!`,
            'alec-steele',
            `My name is Alec Steele and I am a 20 year old blacksmith from Norfolk in the United Kingdom. I upload a vlog from my...`,
            74338401,
            'thumbnail-6.file',
            'MAKING RAINDROP PATTERN DAMASCUS!!!'),

        new Video(
            'video-7.file',
            new Date(),
            'the-bramfam-video-id-7',
            // tslint:disable-next-line:max-line-length
            `Welcome to our channel! Our vlogs will show you the real life of a young married couple who happen to be young parents. From laughter to fights. Accomplishments to struggles. Follow our journey!`,
            'the-bramfam',
            `Welcome to our channel! Our vlogs will show you the real life of a young married couple who...`,
            74338401,
            'thumbnail-7.file',
            'LYRIC PRANK ON HUSBAND DURING AN ARGUMENT!'),
        new Video(
            'video-8.file',
            new Date(),
            'the-bramfam-video-id-8',
            // tslint:disable-next-line:max-line-length
            `Welcome to our channel! Our vlogs will show you the real life of a young married couple who happen to be young parents. From laughter to fights. Accomplishments to struggles. Follow our journey!`,
            'the-bramfam',
            `Welcome to our channel! Our vlogs will show you the real life of a young married couple who...`,
            74338401,
            'thumbnail-8.file',
            'YOU WON\'T BELIEVE WHO INTERVIEWED US!!! (so nervous)'),
        new Video(
            'video-9.file',
            new Date(),
            'the-bramfam-video-id-9',
            // tslint:disable-next-line:max-line-length
            `Welcome to our channel! Our vlogs will show you the real life of a young married couple who happen to be young parents. From laughter to fights. Accomplishments to struggles. Follow our journey!`,
            'the-bramfam',
            `Welcome to our channel! Our vlogs will show you the real life of a young married couple who...`,
            74338401,
            'thumbnail-9.file',
            'We made a HUGE life decision!!! (explained)'),
    ];

    const videoRepository: IVideoRepository = container.get<IVideoRepository>('IVideoRepository');

    for (const video of videos) {
        const existingVideo: Video = await videoRepository.findById(video.id);

        if (!existingVideo) {
            await videoRepository.create(video);
        }
    }
}
