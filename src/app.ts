import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as jwt from 'express-jwt';
import * as fs from 'fs';
import * as path from 'path';
import * as swagger from 'swagger-ui-express';
import * as winston from 'winston';
import * as yargs from 'yargs';
import { AuthRouter } from './routes/auth';
import { ProfileRouter } from './routes/profile';
import { UserRouter } from './routes/user';

winston.add(winston.transports.File, { filename: 'video-sharing-platform.log' });

const argv = yargs.argv;
const app = express();

app.use(bodyParser.json({}));
app.use(cors());

app.route('/api/auth/github')
    .get(AuthRouter.github);

app.use(jwt({ secret: 'video-sharing-platform' }));

// const swaggerDocument = fs.readFileSync(path.join(__dirname, '..', 'swagger.json'), 'utf8');
// app.use('/api/docs', swagger.serve, swagger.setup(JSON.parse(swaggerDocument), { explore: true }));

app.route('/api/profile')
    .get(ProfileRouter.get);

app.route('/api/user')
    .get(UserRouter.get);

app.listen(argv.port || process.env.PORT || 3000, () => {
    winston.info(`listening on port ${argv.port || process.env.PORT || 3000}`);
});

// https://github.com/login/oauth/authorize?response_type=code&client_id=7f03dc607fcb590df9da&redirect_uri=http://localhost:3000/api/auth/github&scope=user:email
