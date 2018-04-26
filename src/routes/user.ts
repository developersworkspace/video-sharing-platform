import * as express from 'express';
import { User } from '../entities/user';
import { container } from '../ioc';
import { UserService } from '../services/user';
import { BaseRouter } from './base';

export class UserRouter extends BaseRouter {

    public static async get(req: express.Request, res: express.Response) {
        try {
            const userService: UserService = container.get<UserService>('UserService');

            if (req.query.id) {
                const resultFindById: User = await userService.findById(req.query.id);

                res.json(resultFindById);

                return;
            }

            const resultFind: User = await userService.find(req['user'].emailAddress);

            res.json(resultFind);
        } catch (err) {
            UserRouter.sendErrorResponse(err, res);
        }
    }

}
