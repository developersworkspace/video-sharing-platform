import * as express from 'express';
import { OperationResult } from 'majuro';
import { Profile } from '../entities/profile';
import { container } from '../ioc';
import { ProfileService } from '../services/profile';
import { BaseRouter } from './base';

export class ProfileRouter extends BaseRouter {

    public static async get(req: express.Request, res: express.Response) {
        try {
            const profileService: ProfileService = container.get<ProfileService>('ProfileService');

            if (req.query.name) {
                const resultFindByName: Profile = await profileService.findByName(req.query.name);

                res.json(resultFindByName);

                return;
            }

            const resultFind: Profile = await profileService.findByEmailAddress(req['user'] ? req['user'].emailAddress : null);

            res.json(resultFind);
        } catch (err) {
            ProfileRouter.sendErrorResponse(err, res);
        }
    }

    public static async put(req: express.Request, res: express.Response) {
        try {
            const profileService: ProfileService = container.get<ProfileService>('ProfileService');

            const result: OperationResult<Profile> = await profileService.update(req['user'] ? req['user'].emailAddress : null, Profile.fromJSON(req.body));

            ProfileRouter.sendOperationResult(res, result);
        } catch (err) {
            ProfileRouter.sendErrorResponse(err, res);
        }
    }

}
