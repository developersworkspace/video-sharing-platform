import * as express from 'express';
import { OperationResult } from 'majuro';

export class BaseRouter {

    protected static sendErrorResponse(err: Error, res: express.Response): void {
        res.status(500).json(err.message);
    }

    protected static sendOperationResult(response: express.Response, result: OperationResult<any>): void {
        if (result.hasErrors()) {
            response.status(400).json(result.messages);
        } else {
            response.json(result.result);
        }
    }

}
