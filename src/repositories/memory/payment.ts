import { injectable } from 'inversify';
import { Payment } from 'majuro';
import { IPaymentRepository } from '../../interfaces/payment-repository';

@injectable()
export class PaymentRepository implements IPaymentRepository {

    protected payments: Payment[] = null;

    constructor() {
        this.payments = [];
    }

    public async create(payment: Payment): Promise<Payment> {
        this.payments.push(payment);

        return payment;
    }

    public async list(subscriptionId: number): Promise<Payment[]> {
        return this.payments.filter((payment: Payment) => payment.subscriptionId === subscriptionId);
    }
}
