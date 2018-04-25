import { injectable } from 'inversify';
import { IPaymentRepository, Payment } from 'majuro';

@injectable()
export class PaymentRepository implements IPaymentRepository {

    protected payments: Payment[] = null;

    constructor() {
        this.payments = [];
    }

    public async list(subscriptionId: number): Promise<Payment[]> {
        return this.payments.filter((payment: Payment) => payment.subscriptionId === subscriptionId);
    }
}
