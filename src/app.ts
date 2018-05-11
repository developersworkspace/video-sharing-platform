import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as fs from 'fs';
import { ILogger } from 'majuro';
import * as path from 'path';
import * as swagger from 'swagger-ui-express';
import * as yamljs from 'yamljs';
import * as yargs from 'yargs';
import { container } from './ioc';
import { AuthenticationMiddleware } from './middleware/authentication';
import { RequestTimeMiddleware } from './middleware/request-time';
import { AuthRouter } from './routes/auth';
import { PaymentRouter } from './routes/payment';
import { ProfileRouter } from './routes/profile';
import { SubscriptionRouter } from './routes/subscription';
import { UserRouter } from './routes/user';
import { VideoRouter } from './routes/video';

const argv = yargs.argv;
const app = express();

app.use(bodyParser.json({ limit: '10mb' }));
app.use(cors());

app.use(RequestTimeMiddleware.call);

app.use(AuthenticationMiddleware.call);

app.route('/api/auth/auth0')
    .get(AuthRouter.auth0);

const swaggerDocument = yamljs.load(path.join(__dirname, 'swagger.yaml'));

app.use('/api/docs', swagger.serve, swagger.setup(swaggerDocument, { explore: true }));

app.route('/api/payment/notify')
    .get(PaymentRouter.notify);

app.route('/api/profile')
    .get(ProfileRouter.get)
    .put(ProfileRouter.put);

app.route('/api/user')
    .get(UserRouter.get)
    .put(UserRouter.put);

app.route('/api/video')
    .get(VideoRouter.get);

app.route('/api/video/thumbnail/stream')
    .get(VideoRouter.getStreamForThumbnail);

app.use(AuthenticationMiddleware.authorized);

app.route('/api/subscription')
    .get(SubscriptionRouter.get);

app.route('/api/subscription/isPaid')
    .get(SubscriptionRouter.isPaid);

app.route('/api/video')
    .post(VideoRouter.post)
    .put(VideoRouter.put);

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

app.listen(argv.port || process.env.PORT || 3000, () => {
    const logger: ILogger = container.get<ILogger>('ILogger');

    logger.info(`listening on port ${argv.port || process.env.PORT || 3000}`);
});

// https://developersworkspace.auth0.com/authorize?response_type=token&client_id=CZ5i4EtEMua0Myv08pZlen35d4aiE7n0&redirect_uri=http://localhost:4200/callback

// https://developersworkspace.auth0.com/authorize?response_type=token&client_id=CZ5i4EtEMua0Myv08pZlen35d4aiE7n0&redirect_uri=http://localhost:3000/api/auth/auth0
