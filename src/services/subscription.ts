import { inject, injectable } from 'inversify';
import { IPaymentGateway, IPaymentRepository, ISubscriptionRepository, IValidator, Subscription, SubscriptionService as MajuroSubscriptionService } from 'majuro';

@injectable()
export class SubscriptionService extends MajuroSubscriptionService {

    constructor(
        @inject('IPaymentGateway')
        paymentGateway: IPaymentGateway,
        @inject('IPaymentRepository')
        paymentRepository: IPaymentRepository,
        @inject('ISubscriptionRepository')
        subscriptionRepository: ISubscriptionRepository,
        @inject('IValidator<Subscription>')
        subscriptionValidator: IValidator<Subscription>,
    ) {
        super(paymentGateway, paymentRepository, subscriptionRepository, subscriptionValidator);
    }
}
