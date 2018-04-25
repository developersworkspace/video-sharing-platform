import { Container, decorate, injectable, interfaces } from 'inversify';
import { IPaymentGateway, IPaymentRepository, ISubscriptionRepository, IValidator, PayFastPaymentGateway, Subscription, SubscriptionService as MajuroSubscriptionService, SubscriptionValidator  } from 'majuro';
import 'reflect-metadata';
import { PaymentRepository } from './repositories/memory/payment';
import { SubscriptionRepository } from './repositories/memory/subscription';
import { ProfileService } from './services/profile';
import { SubscriptionService } from './services/subscription';
import { UserService } from './services/user';

const container: Container = new Container();

decorate(injectable(), MajuroSubscriptionService);
decorate(injectable(), PayFastPaymentGateway);
decorate(injectable(), SubscriptionValidator);

container.bind<IPaymentRepository>('IPaymentRepository').to(PaymentRepository);
container.bind<ISubscriptionRepository>('ISubscriptionRepository').to(SubscriptionRepository);

container.bind<ProfileService>('ProfileService').to(ProfileService);
container.bind<SubscriptionService>('SubscriptionService').to(SubscriptionService);
container.bind<UserService>('UserService').to(UserService);

container.bind<IPaymentGateway>('IPaymentGateway').toConstantValue(new PayFastPaymentGateway(
    'https://example.com/cancel',
    '11223714',
    'ak5h6ln1aiwgi',
    'https://api.suite.worldofrations.com/api/subscription/notify',
    'mMUQYkYSV7Jf3Nxr',
    'https://example.com/return',
    false,
));

container.bind<IValidator<Subscription>>('IValidator<Subscription>').toConstantValue(new SubscriptionValidator());

export {
    container,
};
