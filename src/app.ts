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
import { SubscriptionRouter } from './routes/subscription';
import { UserRouter } from './routes/user';
import { VideoRouter } from './routes/video';

winston.add(winston.transports.File, { filename: 'video-sharing-platform.log' });

const argv = yargs.argv;
const app = express();

app.use(bodyParser.json({}));
app.use(cors());

app.route('/api/auth/auth0')
    .get(AuthRouter.auth0);

// app.use(jwt({ secret: 'video-sharing-platform' }));

app.use((req: express.Request, response: express.Response, next: express.NextFunction) => {
    req['user'] = {
        emailAddress: 'chris@leslingshot.com',
    };

    next();
});

// const swaggerDocument = fs.readFileSync(path.join(__dirname, '..', 'swagger.json'), 'utf8');
// app.use('/api/docs', swagger.serve, swagger.setup(JSON.parse(swaggerDocument), { explore: true }));

app.route('/api/profile')
    .get(ProfileRouter.get);

app.route('/api/subscription')
    .get(SubscriptionRouter.get);

app.route('/api/subscription/isPaid')
    .get(SubscriptionRouter.isPaid);

app.route('/api/user')
    .get(UserRouter.get);

app.route('/api/video')
    .get(VideoRouter.get);

app.route('/api/video/append')
    .post(VideoRouter.appendUploadForVideo);

app.route('/api/video/end')
    .post(VideoRouter.endUploadForVideo);

app.route('/api/video/start')
    .post(VideoRouter.startUploadForVideo);

app.route('/api/video/stream')
    .get(VideoRouter.getStreamForVideo);

app.route('/api/video/thumbnail/append')
    .post(VideoRouter.appendUploadForThumbnail);

app.route('/api/video/thumbnail/end')
    .post(VideoRouter.endUploadForThumbnail);

app.route('/api/video/thumbnail/start')
    .post(VideoRouter.startUploadForThumbnail);

app.route('/api/video/thumbnail/stream')
    .get(VideoRouter.getStreamForThumbnail);

app.listen(argv.port || process.env.PORT || 3000, () => {
    winston.info(`listening on port ${argv.port || process.env.PORT || 3000}`);
});

// https://developersworkspace.auth0.com/authorize?response_type=token&client_id=CZ5i4EtEMua0Myv08pZlen35d4aiE7n0&redirect_uri=http://localhost:4200/callback

// https://developersworkspace.auth0.com/authorize?response_type=token&client_id=CZ5i4EtEMua0Myv08pZlen35d4aiE7n0&redirect_uri=http://localhost:3000/api/auth/auth0
