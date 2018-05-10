import { injectable } from 'inversify';
import { Payment } from 'majuro';
import { IPaymentRepository } from '../../interfaces/payment-repository';
import { BaseRepository } from './base';

@injectable()
export class PaymentRepository implements IPaymentRepository {

    protected static payments: Payment[] = [];

    constructor() {
    }

    public async create(payment: Payment): Promise<Payment> {
        const newPayment: Payment = payment.clone();

        newPayment.id = BaseRepository.nextNumericId();

        PaymentRepository.payments.push(newPayment);

        return newPayment;
    }

    public async list(subscriptionId: number): Promise<Payment[]> {
        return PaymentRepository.payments.filter((payment: Payment) => payment.subscriptionId === subscriptionId);
    }
}
