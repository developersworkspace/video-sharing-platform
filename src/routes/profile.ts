import * as express from 'express';
import { Profile } from '../entities/profile';
import { container } from '../ioc';
import { ProfileService } from '../services/profile';
import { BaseRouter } from './base';

export class ProfileRouter extends BaseRouter {

    public static async get(req: express.Request, res: express.Response) {
        try {
            const profileService: ProfileService = container.get<ProfileService>('ProfileService');

            const result: Profile = await profileService.find(req['user'].emailAddress);

            res.json(result);
        } catch (err) {
            ProfileRouter.sendErrorResponse(err, res);
        }
    }

}
