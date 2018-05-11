import * as express from 'express';
import * as jsonwebtoken from 'jsonwebtoken';
import { ILogger } from 'majuro';
import { container } from '../ioc';

export class RequestTimeMiddleware {

    public static async call(request: express.Request, response: express.Response, next: express.NextFunction): Promise<void> {
        const logger: ILogger = container.get<ILogger>('ILogger');

        const startTimestamp: number = new Date().getTime();

        response.on('finish', () => {
            const endTimestamp: number = new Date().getTime();
            const duration: number = endTimestamp - startTimestamp;

            logger.info(`[${__filename}]: '${request.url}' took ${duration} ms`, {
                duration,
                url: request.url,
            });
        });

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
