import * as express from 'express';
import { User } from '../entities/user';
import { container } from '../ioc';
import { UserService } from '../services/user';
import { BaseRouter } from './base';

export class VideoRouter extends BaseRouter {

    public static async startUpload(req: express.Request, res: express.Response) {
        try {
            const userService: UserService = container.get<UserService>('UserService');

            const result: User = await userService.find(req['user'].emailAddress);

            res.json(result);
        } catch (err) {
            UserRouter.sendErrorResponse(err, res);
        }
    }

}
