import { injectable } from 'inversify';
import { ISubscriptionRepository, Subscription } from 'majuro';
import { BaseRepository } from './base';

@injectable()
export class SubscriptionRepository implements ISubscriptionRepository {

    protected static subscriptions: Subscription[] = [];

    constructor() {
    }

    public async create(subscription: Subscription): Promise<Subscription> {
        const newSubscription: Subscription = subscription.clone();

        newSubscription.id = BaseRepository.nextNumericId();

        SubscriptionRepository.subscriptions.push(newSubscription);

        return newSubscription;
    }

    public async delete(subscriptionId: number): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async find(userId: string): Promise<Subscription> {
        return SubscriptionRepository.subscriptions.find((subscription: Subscription) => subscription.userId === userId);
    }
}
