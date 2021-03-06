import { Container, decorate, injectable, interfaces } from 'inversify';
import { AES256CTRCryptographyAlgorithm, DailyRollingFileLogger, ICryptographyAlgorithm, ILogger, IPaymentGateway, IPaymentRepository as MajuroIPaymentRepository, ISubscriptionRepository, IValidator, PayFastPaymentGateway, Subscription, SubscriptionService as MajuroSubscriptionService, SubscriptionValidator } from 'majuro';
import 'reflect-metadata';
import { config } from './config';
import { IPaymentRepository } from './interfaces/payment-repository';
import { IProfileRepository } from './interfaces/profile-repository';
import { IStorageGateway } from './interfaces/storage-gateway';
import { IUserRepository } from './interfaces/user-repository';
import { IVideoRepository } from './interfaces/video-repository';
import { BaseRepository } from './repositories/mongo/base';
import { PaymentRepository } from './repositories/mongo/payment';
import { ProfileRepository } from './repositories/mongo/profile';
import { SubscriptionRepository } from './repositories/mongo/subscription';
import { UserRepository } from './repositories/mongo/user';
import { VideoRepository } from './repositories/mongo/video';
import { seed } from './seed';
import { ProfileService } from './services/profile';
import { SubscriptionService } from './services/subscription';
import { UserService } from './services/user';
import { VideoService } from './services/video';
import { FileSystemStorageGateway } from './storage-gateways/file-system';

const container: Container = new Container();

decorate(injectable(), MajuroSubscriptionService);
decorate(injectable(), PayFastPaymentGateway);
decorate(injectable(), SubscriptionValidator);

container.bind<BaseRepository>('BaseRepository').toConstantValue(new BaseRepository('video-sharing-platform-2018-05-11', config.database.host, new DailyRollingFileLogger('./', null, 'video-sharing-platform'), 10, 1200));

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

const cryptographyAlgorithm: ICryptographyAlgorithm = new AES256CTRCryptographyAlgorithm('enter-password-here');

container.bind<IPaymentGateway>('IPaymentGateway').toConstantValue(new PayFastPaymentGateway(
    'https://example.com/cancel',
    config.payfast.merchantId,
    cryptographyAlgorithm.decrypt(config.payfast.merchantSecret),
    'https://api.suite.worldofrations.com/api/subscription/notify',
    cryptographyAlgorithm.decrypt(config.payfast.passphrase),
    'https://example.com/return',
    false,
));
container.bind<IStorageGateway>('IStorageGateway').toConstantValue(new FileSystemStorageGateway(config.paths.base));

container.bind<IValidator<Subscription>>('IValidator<Subscription>').toConstantValue(new SubscriptionValidator());

container.bind<ILogger>('ILogger').toConstantValue(new DailyRollingFileLogger('./', null, 'video-sharing-platform'));

// Seed Database
seed();

export {
    container,
};
