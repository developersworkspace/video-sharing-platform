import { injectable } from 'inversify';
import { ISubscriptionRepository, Subscription } from 'majuro';

@injectable()
export class SubscriptionRepository implements ISubscriptionRepository {

    protected static subscriptions: Subscription[] = [];

    constructor() {
    }

    public async create(subscription: Subscription): Promise<Subscription> {
        subscription.id = 1;

        SubscriptionRepository.subscriptions.push(subscription);

        return subscription;
    }

    public async delete(subscriptionId: number): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async find(userId: string): Promise<Subscription> {
        return SubscriptionRepository.subscriptions.find((subscription: Subscription) => subscription.userId === userId);
    }
}
