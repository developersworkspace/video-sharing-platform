import { Payment } from 'majuro';
import { IPaymentRepository } from '../interfaces/payment-repository';

export class PaymentService {

    constructor(
        protected paymentRepository: IPaymentRepository,
    ) {

    }

    public async notify(subscriptionId: number, token: string): Promise<void> {
        this.paymentRepository.create(new Payment(null, subscriptionId, new Date(), token));
    }

}
