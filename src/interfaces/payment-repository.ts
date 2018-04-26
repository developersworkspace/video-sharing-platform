import { IPaymentRepository as MajuroIPaymentRepository, Payment } from 'majuro';

export interface IPaymentRepository extends MajuroIPaymentRepository {

    create(payment: Payment): Promise<Payment>;

}
