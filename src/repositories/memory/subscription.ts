import { injectable } from 'inversify';
import { ISubscriptionRepository, Subscription } from 'majuro';

@injectable()
export class SubscriptionRepository implements ISubscriptionRepository {

    protected subscriptions: Subscription[] = null;

    constructor() {
        this.subscriptions = [];
    }

    public async create(subscription: Subscription): Promise<Subscription> {
        subscription.id = 1;

        this.subscriptions.push(subscription);

        return subscription;
    }

    public async delete(subscriptionId: number): Promise<void> {
        throw new Error('Method not implemented.');
    }

    public async find(userId: string): Promise<Subscription> {
        return this.subscriptions.find((subscription: Subscription) => subscription.userId === userId);
    }
}
