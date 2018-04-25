import axios, { AxiosResponse } from 'axios';
import * as express from 'express';
import * as jsonwebtoken from 'jsonwebtoken';
import { BaseRouter } from './base';

export class AuthRouter extends BaseRouter {

    public static async github(req: express.Request, res: express.Response) {
        try {
            const code: string = req.query.code;

            const accessTokenResponse: AxiosResponse<any> = await axios({
                data: {
                    client_id: '7f03dc607fcb590df9da',
                    client_secret: '7c3e3a2098cdb196db16306e3eb0c71f21a4a760',
                    code,
                    redirect_uri: 'http://localhost:3000/api/auth/github',
                },
                method: 'POST',
                url: 'https://github.com/login/oauth/access_token',
            });

            const accessToken: string = new RegExp(/access_token=([^&]*)/g).exec(accessTokenResponse.data)[1];

            const userResponse: AxiosResponse<any> = await axios({
                headers: {
                    authorization: `bearer ${accessToken}`,
                },
                method: 'GET',
                url: 'https://api.github.com/user',
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
