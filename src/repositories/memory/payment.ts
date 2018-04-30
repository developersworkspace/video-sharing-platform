import { injectable } from 'inversify';
import { Payment } from 'majuro';
import { IPaymentRepository } from '../../interfaces/payment-repository';

@injectable()
export class PaymentRepository implements IPaymentRepository {

    protected static payments: Payment[] = [];

    constructor() {
    }

    public async create(payment: Payment): Promise<Payment> {
        PaymentRepository.payments.push(payment);

        return payment;
    }

    public async list(subscriptionId: number): Promise<Payment[]> {
        return PaymentRepository.payments.filter((payment: Payment) => payment.subscriptionId === subscriptionId);
    }
}
