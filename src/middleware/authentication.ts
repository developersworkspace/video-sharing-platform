import * as express from 'express';
import * as jsonwebtoken from 'jsonwebtoken';
import { OperationResult } from 'majuro';
import { Profile } from '../entities/profile';
import { User } from '../entities/user';
import { container } from '../ioc';
import { ProfileService } from '../services/profile';
import { UserService } from '../services/user';
import { Address } from '../value-objects/address';
import { ContactDetails } from '../value-objects/contact-details';
import { SocialDetails } from '../value-objects/social-details';

export class AuthenticationMiddleware {

    public static async call(request: express.Request, response: express.Response, next: express.NextFunction): Promise<void> {
        if (!request.get('authorization') && !request.query.token) {
            next();
            return;
        }

        let token: string = null;

        if (request.get('authorization')) {
            const patternAuthorization: RegExp = new RegExp(/bearer (.*)/i);

            const matchesAuthorization: RegExpExecArray = patternAuthorization.exec(request.get('authorization'));

            if (!matchesAuthorization) {
                next();
                return;
            }

            token = matchesAuthorization[1];
        }

        if (request.query.token) {
            token = request.query.token;
        }

        try {
            const decodedJWT: any = jsonwebtoken.verify(token, 'video-sharing-platform');

            const profileService: ProfileService = container.get<ProfileService>('ProfileService');
            const userService: UserService = container.get<UserService>('UserService');

            let user: User = await userService.find(decodedJWT.emailAddress);

            if (!user) {
                user = new User(decodedJWT.emailAddress, null, null, null);

                const operationResultCreateUser: OperationResult<User> = await userService.create(decodedJWT.emailAddress, user);

                user = operationResultCreateUser.result;
            }

            let profile: Profile = await profileService.find(decodedJWT.emailAddress);

            if (!profile) {
                profile = new Profile(
                    new Address(null, null),
                    new ContactDetails(null, null),
                    null,
                    null,
                    null,
                    null,
                    new SocialDetails(null, null, null),
                    user.id,
                );

                const operationResultCreateProfile: OperationResult<Profile> = await profileService.create(decodedJWT.emailAddress, profile);

                profile = operationResultCreateProfile.result;
            }

            request['user'] = user;
        } catch {
            next();
            return;
        }

        next();
    }

    public static async authorized(request: express.Request, response: express.Response, next: express.NextFunction): Promise<void> {
        if (!request['user']) {
            response.status(401).end();
            return;
        }

        next();
    }

}
