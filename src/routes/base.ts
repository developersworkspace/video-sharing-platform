import * as express from 'express';
import { ILogger, OperationResult } from 'majuro';
import { container } from '../ioc';

export class BaseRouter {

    protected static sendErrorResponse(err: Error, res: express.Response): void {
        res.status(500).json(err.message);
    }

    protected static sendOperationResult(response: express.Response, result: OperationResult<any>): void {
        if (result.hasErrors()) {
            const logger: ILogger = container.get<ILogger>('ILogger');

            for (const error of result.errors) {
                logger.error(error);
            }

            response.status(400).json(result.messages);
        } else {
            response.json(result.result);
        }
    }

}
