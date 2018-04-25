import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as swagger from 'swagger-ui-express';
import * as winston from 'winston';
import * as yargs from 'yargs';
import { AuthenticationMiddleware } from './middleware/authentication';
import { CustomerRouter } from './routes/customer';

winston.add(winston.transports.File, { filename: 'example-project.log' });

const argv = yargs.argv;
const app = express();

app.use(bodyParser.json({}));
app.use(cors());

// const swaggerDocument = fs.readFileSync(path.join(__dirname, '..', 'swagger.json'), 'utf8');
// app.use('/api/docs', swagger.serve, swagger.setup(JSON.parse(swaggerDocument), { explore: true }));

app.route('/api/customer')
    .get(AuthenticationMiddleware.shouldBeAuthenticated, CustomerRouter.get)
    .post(AuthenticationMiddleware.shouldBeAuthenticated, CustomerRouter.post);

app.route('/api/customer/search')
    .get(AuthenticationMiddleware.shouldBeAuthenticated, CustomerRouter.search);

app.listen(argv.port || process.env.PORT || 3000, () => {
    winston.info(`listening on port ${argv.port || process.env.PORT || 3000}`);
});
