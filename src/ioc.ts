import { Container, decorate, injectable, interfaces } from 'inversify';
import { IPaymentGateway, IPaymentRepository as MajuroIPaymentRepository, ISubscriptionRepository, IValidator, PayFastPaymentGateway, Subscription, SubscriptionService as MajuroSubscriptionService, SubscriptionValidator } from 'majuro';
import 'reflect-metadata';
import { config } from './config';
import { Profile } from './entities/profile';
import { IPaymentRepository } from './interfaces/payment-repository';
import { IProfileRepository } from './interfaces/profile-repository';
import { IStorageGateway } from './interfaces/storage-gateway';
import { IUserRepository } from './interfaces/user-repository';
import { IVideoRepository } from './interfaces/video-repository';
import { SubscriptionRepository } from './repositories/memory/subscription';
import { UserRepository } from './repositories/memory/user';
import { VideoRepository } from './repositories/memory/video';
import { BaseRepository } from './repositories/mongo/base';
import { PaymentRepository } from './repositories/mongo/payment';
import { ProfileRepository } from './repositories/mongo/profile';
import { ProfileService } from './services/profile';
import { SubscriptionService } from './services/subscription';
import { UserService } from './services/user';
import { VideoService } from './services/video';
import { FileSystemStorageGateway } from './storage-gateways/file-system';
import { Address } from './value-objects/address';
import { ContactDetails } from './value-objects/contact-details';
import { SocialDetails } from './value-objects/social-details';

const container: Container = new Container();

decorate(injectable(), MajuroSubscriptionService);
decorate(injectable(), PayFastPaymentGateway);
decorate(injectable(), SubscriptionValidator);

container.bind<BaseRepository>('BaseRepository').toConstantValue(new BaseRepository('video-sharing-platform', 'mongodb://127.0.0.1:27017'));

container.bind<MajuroIPaymentRepository>('MajuroIPaymentRepository').to(PaymentRepository);
container.bind<IPaymentRepository>('IPaymentRepository').to(PaymentRepository);
container.bind<IProfileRepository>('IProfileRepository').to(ProfileRepository);
container.bind<ISubscriptionRepository>('ISubscriptionRepository').to(SubscriptionRepository);
container.bind<IUserRepository>('IUserRepository').to(UserRepository);
container.bind<IVideoRepository>('IVideoRepository').to(VideoRepository);

container.bind<ProfileService>('ProfileService').to(ProfileService);
container.bind<SubscriptionService>('SubscriptionService').to(SubscriptionService);
container.bind<UserService>('UserService').to(UserService);
container.bind<VideoService>('VideoService').to(VideoService);

container.bind<IPaymentGateway>('IPaymentGateway').toConstantValue(new PayFastPaymentGateway(
    'https://example.com/cancel',
    '11223714',
    'ak5h6ln1aiwgi',
    'https://api.suite.worldofrations.com/api/subscription/notify',
    'mMUQYkYSV7Jf3Nxr',
    'https://example.com/return',
    false,
));
container.bind<IStorageGateway>('IStorageGateway').toConstantValue(new FileSystemStorageGateway(config.paths.base));

container.bind<IValidator<Subscription>>('IValidator<Subscription>').toConstantValue(new SubscriptionValidator());

// Seed Database
(async () => {
    const profileService: ProfileService = container.get<ProfileService>('ProfileService');

    const chrisRamsayProfile: Profile = await profileService.findByName('chris-ramsay');

    if (!chrisRamsayProfile) {
        await profileService.create(null,  new Profile(
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
        ));
    }
})();

export {
    container,
};
