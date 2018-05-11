import { inject, injectable } from 'inversify';
import { Payment } from 'majuro';
import * as mongo from 'mongodb';
import { IPaymentRepository } from '../../interfaces/payment-repository';
import { BaseRepository } from './base';

@injectable()
export class PaymentRepository implements IPaymentRepository {

    constructor(
        @inject('BaseRepository')
        protected baseRepository: BaseRepository,
    ) {

    }

    public async create(payment: Payment): Promise<Payment> {
        const newPayment: Payment = payment.clone();

        newPayment.id = await this.baseRepository.nextNumericId();

        const collection: mongo.Collection  = await this.baseRepository.getCollection('payments');

        await collection.insertOne({
            numericId: newPayment.id,
            subscriptionId: payment.subscriptionId,
            timestamp: newPayment.timestamp,
            token: newPayment.token,
        });

        return newPayment;
    }

    public async list(subscriptionId: number): Promise<Payment[]> {
        const collection: mongo.Collection  = await this.baseRepository.getCollection('payments');

        const result: any[] = await collection.find({
            subscriptionId,
        }).toArray();

        return result.map((x: any) => new Payment(x.numericId, x.subscriptionId, new Date(x.timestamp), x.token));
    }

}
