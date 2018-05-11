import * as express from 'express';
import { ILogger } from 'majuro';
import { container } from '../ioc';
import { PaymentService } from '../services/payment';
import { BaseRouter } from './base';

export class PaymentRouter extends BaseRouter {

    public static async notify(req: express.Request, res: express.Response) {
        try {
            const logger: ILogger = container.get<ILogger>('ILogger');

            const paymentService: PaymentService = container.get<PaymentService>('PaymentService');

            // {
            //     "m_payment_id":"10",
            //     "pf_payment_id":"11471718",
            //     "payment_status":"COMPLETE",
            //     "item_name":"World of Rations Suite Subscription",
            //     "item_description":"STANDARD Subscription",
            //     "amount_gross":"5.00",
            //     "amount_fee":"-2.49",
            //     "amount_net":"2.51",
            //     "custom_str1":"",
            //     "custom_str2":"",
            //     "custom_str3":"",
            //     "custom_str4":"",
            //     "custom_str5":"",
            //     "custom_int1":"",
            //     "custom_int2":"",
            //     "custom_int3":"",
            //     "custom_int4":"",
            //     "custom_int5":"",
            //     "name_first":"bjcustomsoft@gmail.com",
            //     "name_last":"",
            //     "email_address":"bjcustomsoft@gmail.com",
            //     "merchant_id":"11223714",
            //     "token":"739d3fb4-644d-eef7-9998-fc4555150e52",
            //     "billing_date":"2018-03-05",
            //     "signature":"a3096732ad440365b850403f512fa919"
            //  }

            await paymentService.notify(parseInt(req.body.m_payment_id, undefined), req.body.token);

            logger.info(`[${__filename}]: Payment Notification`, req.body);

            res.json('OK');
        } catch (err) {
            PaymentRouter.sendErrorResponse(err, res);
        }
    }

}
