import { Payment } from 'majuro';
import { IPaymentRepository } from '../interfaces/payment-repository';

export class PaymentService {

    constructor(
        protected paymentRepository: IPaymentRepository,
    ) {

    }

    public async notify(id: number, subscriptionId: number, token: string): Promise<void> {
        this.paymentRepository.create(new Payment(id, subscriptionId, new Date(), token));
    }

}
