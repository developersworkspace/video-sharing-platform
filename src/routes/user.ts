import * as express from 'express';
import { config } from '../config';
import { ICustomerService } from '../interfaces/customer-service';
import { container } from '../ioc';
import { CustomerMapper } from '../mappers/customer';
import { Customer } from '../models/customer';
import { OperationResult } from 'majuro';
import { BaseRouter } from './base';

export class UserRouter extends BaseRouter {

    public static async get(req: express.Request, res: express.Response) {
        try {
            const customerService: ICustomerService = container.get<ICustomerService>('ICustomerService');

            const result: OperationResult<Customer> = await customerService.find(req.query.id);

            CustomerRouter.sendOperationResult(res, result);
        } catch (err) {
            CustomerRouter.sendErrorResponse(err, res);
        }
    }

    public static async post(req: express.Request, res: express.Response) {
        try {
            const body = req.body;

            const customerMapper: CustomerMapper = new CustomerMapper();

            const customer: Customer = customerMapper.map(req.body);

            const customerService: ICustomerService = container.get<ICustomerService>('ICustomerService');

            const result: OperationResult<Customer> = await customerService.create(customer);

            CustomerRouter.sendOperationResult(res, result);
        } catch (err) {
            CustomerRouter.sendErrorResponse(err, res);
        }
    }

    public static async search(req: express.Request, res: express.Response) {
        try {
            const query = req.query;

            const customerService: ICustomerService = container.get<ICustomerService>('ICustomerService');

            const result: OperationResult<Customer[]> = await customerService.search(query);

            CustomerRouter.sendOperationResult(res, result);
        } catch (err) {
            CustomerRouter.sendErrorResponse(err, res);
        }
    }

}