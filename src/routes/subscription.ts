import * as express from 'express';
import { Frequency, OperationResult, Subscription, SubscriptionCreateResult } from 'majuro';
import { container } from '../ioc';
import { SubscriptionService } from '../services/subscription';
import { BaseRouter } from './base';

export class SubscriptionRouter extends BaseRouter {

    public static async get(req: express.Request, res: express.Response) {
        try {
            const subscriptionService: SubscriptionService = container.get<SubscriptionService>('SubscriptionService');

            const result: OperationResult<SubscriptionCreateResult> = await subscriptionService.create(new Subscription(25, 'Video Sharing Platform is a ....', Frequency.Monthly, null, 'Video Sharing Platform', 'type', req['user'] ? req['user'].emailAddress : null));

            SubscriptionRouter.sendOperationResult(res, result);
        } catch (err) {
            SubscriptionRouter.sendErrorResponse(err, res);
        }
    }

    public static async isPaid(req: express.Request, res: express.Response) {
        try {
            const subscriptionService: SubscriptionService = container.get<SubscriptionService>('SubscriptionService');

            const result: boolean = await subscriptionService.isPaid('type', req['user'] ? req['user'].emailAddress : null);

            res.json(result);
        } catch (err) {
            SubscriptionRouter.sendErrorResponse(err, res);
        }
    }

}
