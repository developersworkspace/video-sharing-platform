import { inject, injectable } from 'inversify';
import { ISubscriptionRepository, Subscription } from 'majuro';
import * as mongo from 'mongodb';
import { BaseRepository } from './base';

@injectable()
export class SubscriptionRepository implements ISubscriptionRepository {

    constructor(
        @inject('BaseRepository')
        protected baseRepository: BaseRepository,
    ) {
    }

    public async create(subscription: Subscription): Promise<Subscription> {
        const newSubscription: Subscription = subscription.clone();

        newSubscription.id = await this.baseRepository.nextNumericId();

        const collection: mongo.Collection = await this.baseRepository.getCollection('subscriptions');

        await collection.insertOne({
            amount: subscription.amount,
            deleted: false,
            description: subscription.description,
            frequency: subscription.frequency,
            name: newSubscription.name,
            numericId: newSubscription.id,
            type: newSubscription.type,
            userId: newSubscription.userId,
        });

        return newSubscription;
    }

    public async delete(subscriptionId: number): Promise<void> {
        const collection: mongo.Collection = await this.baseRepository.getCollection('subscriptions');

        await collection.updateOne({
            numericId: subscriptionId,
        }, {
                $set: {
                    deleted: true,
                },
            });
    }

    public async findByUserId(type: string, userId: string): Promise<Subscription> {
        const collection: mongo.Collection = await this.baseRepository.getCollection('subscriptions');

        const result: any = await collection.findOne({
            type,
            userId,
        });

        return result ? new Subscription(result.amount, result.description, result.frequency, result.numericId, result.name, result.type, result.userId) : null;
    }
}
