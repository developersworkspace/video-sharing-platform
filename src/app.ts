import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as fs from 'fs';
import * as jsonwebtoken from 'jsonwebtoken';
import * as path from 'path';
import * as swagger from 'swagger-ui-express';
import * as winston from 'winston';
import * as yamljs from 'yamljs';
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

const swaggerDocument = yamljs.load(path.join(__dirname, 'swagger.yaml'));

app.use('/api/docs', swagger.serve, swagger.setup(swaggerDocument, { explore: true }));

// app.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
//     if (!request.get('authorization') && !request.query.token) {
//         response.status(401).end();
//         return;
//     }

//     let token: string = null;

//     if (request.get('authorization')) {
//         const patternAuthorization: RegExp = new RegExp(/bearer (.*)/i);

//         const matchesAuthorization: RegExpExecArray = patternAuthorization.exec(request.get('authorization'));

//         if (!matchesAuthorization) {
//             response.status(401).end();
//             return;
//         }

//         token = matchesAuthorization[1];
//     }

//     if (request.query.token) {
//         token = request.query.token;
//     }

//     try {
//         const decodedJWT: any = jsonwebtoken.verify(token, 'video-sharing-platform');

//         request['user'] = decodedJWT;
//     } catch {
//         response.status(401).end();
//         return;
//     }

//     next();
// });

app.use((req: express.Request, response: express.Response, next: express.NextFunction) => {
    req['user'] = {
        emailAddress: 'chris@leslingshot.com',
    };

    next();
});

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

// app.use((request: express.Request, response: express.Response, next: express.NextFunction) => {
//     if (!request.get('authorization') && !request.query.token) {
//         response.status(401).end();
//         return;
//     }

//     let token: string = null;

//     if (request.get('authorization')) {
//         const patternAuthorization: RegExp = new RegExp(/bearer (.*)/i);

//         const matchesAuthorization: RegExpExecArray = patternAuthorization.exec(request.get('authorization'));

//         if (!matchesAuthorization) {
//             response.status(401).end();
//             return;
//         }

//         token = matchesAuthorization[1];
//     }

//     if (request.query.token) {
//         token = request.query.token;
//     }

//     try {
//         const decodedJWT: any = jsonwebtoken.verify(token, 'video-sharing-platform');

//         request['user'] = decodedJWT;
//     } catch {
//         response.status(401).end();
//         return;
//     }

//     next();
// });

app.use((req: express.Request, response: express.Response, next: express.NextFunction) => {
    req['user'] = {
        emailAddress: 'chris@leslingshot.com',
    };

    next();
});

app.route('/api/subscription')
    .get(SubscriptionRouter.get);

app.route('/api/subscription/isPaid')
    .get(SubscriptionRouter.isPaid);

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
    winston.info(`listening on port ${argv.port || process.env.PORT || 3000}`);
});

// https://developersworkspace.auth0.com/authorize?response_type=token&client_id=CZ5i4EtEMua0Myv08pZlen35d4aiE7n0&redirect_uri=http://localhost:4200/callback

// https://developersworkspace.auth0.com/authorize?response_type=token&client_id=CZ5i4EtEMua0Myv08pZlen35d4aiE7n0&redirect_uri=http://localhost:3000/api/auth/auth0
