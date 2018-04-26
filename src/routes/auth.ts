import axios, { AxiosResponse } from 'axios';
import * as express from 'express';
import * as jsonwebtoken from 'jsonwebtoken';
import { BaseRouter } from './base';

export class AuthRouter extends BaseRouter {

    public static async auth0(req: express.Request, res: express.Response) {
        try {
            const token: string = req.query.token;

            const userResponse: AxiosResponse<any> = await axios({
                headers: {
                    authorization: `bearer ${token}`,
                },
                method: 'GET',
                url: 'https://developersworkspace.auth0.com/userinfo',
            });

            const jwt: string = jsonwebtoken.sign({
                emailAddress: userResponse.data.email,
            }, 'video-sharing-platform', {
                    issuer: 'video-sharing-platform',
                });

            res.json(jwt);
        } catch (err) {
            AuthRouter.sendErrorResponse(err, res);
        }
    }

}
