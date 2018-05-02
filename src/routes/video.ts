import * as express from 'express';
import * as fs from 'fs';
import { ExpressJSVideoHelper, OperationResult } from 'majuro';
import * as path from 'path';
import { Stream } from 'stream';
import { config } from '../config';
import { Video } from '../entities/video';
import { container } from '../ioc';
import { VideoService } from '../services/video';
import { BaseRouter } from './base';

export class VideoRouter extends BaseRouter {

    public static async appendUploadForThumbnail(req: express.Request, res: express.Response) {
        try {
            const videoService: VideoService = container.get<VideoService>('VideoService');

            const result: OperationResult<boolean> = await videoService.appendUploadForThumbnail(Buffer.from(req.body), req['user'] ? req['user'].emailAddress : null, req.query.id, parseInt(req.query.offset, undefined));

            VideoRouter.sendOperationResult(res, result);
        } catch (err) {
            VideoRouter.sendErrorResponse(err, res);
        }
    }

    public static async appendUploadForVideo(req: express.Request, res: express.Response) {
        try {
            const videoService: VideoService = container.get<VideoService>('VideoService');

            const result: OperationResult<boolean> = await videoService.appendUploadForVideo(req.body, req['user'] ? req['user'].emailAddress : null, req.query.id, parseInt(req.query.offset, undefined));

            VideoRouter.sendOperationResult(res, result);
        } catch (err) {
            VideoRouter.sendErrorResponse(err, res);
        }
    }

    public static async endUploadForThumbnail(req: express.Request, res: express.Response) {
        try {
            const videoService: VideoService = container.get<VideoService>('VideoService');

            const result: boolean = await videoService.endUploadForThumbnail(req['user'] ? req['user'].emailAddress : null, req.query.id);

            res.json(result);
        } catch (err) {
            VideoRouter.sendErrorResponse(err, res);
        }
    }

    public static async endUploadForVideo(req: express.Request, res: express.Response) {
        try {
            const videoService: VideoService = container.get<VideoService>('VideoService');

            const result: boolean = await videoService.endUploadForVideo(req['user'] ? req['user'].emailAddress : null, req.query.id);

            res.json(result);
        } catch (err) {
            VideoRouter.sendErrorResponse(err, res);
        }
    }

    public static async get(req: express.Request, res: express.Response) {
        try {
            const videoService: VideoService = container.get<VideoService>('VideoService');

            if (req.query.id) {
                const resultGet: OperationResult<Video> = await videoService.get(true, req['user'] ? req['user'].emailAddress : null, req.query.id);

                VideoRouter.sendOperationResult(res, resultGet);

                return;
            }

            if (req.query.profileName) {
                const resultList: Video[] = await videoService.list(req['user'] ? req['user'].emailAddress : null, req.query.profileName);

                res.json(resultList);

                return;
            }
        } catch (err) {
            VideoRouter.sendErrorResponse(err, res);
        }
    }

    public static async getStreamForThumbnail(req: express.Request, res: express.Response) {
        try {
            const videoService: VideoService = container.get<VideoService>('VideoService');

            const result: OperationResult<Video> = await videoService.get(true, req['user'] ? req['user'].emailAddress : null, req.query.id);

            if (result.hasErrors()) {
                res.status(400).json(result.messages);
                return;
            }

            const video: Video = result.result;

            const stream: Stream = fs.createReadStream(video.thumbnailLocation);

            res.set('Content-Type', 'image/jpg');

            stream.pipe(res);
        } catch (err) {
            VideoRouter.sendErrorResponse(err, res);
        }
    }

    public static async getStreamForVideo(req: express.Request, res: express.Response) {
        try {
            const videoService: VideoService = container.get<VideoService>('VideoService');

            const result: OperationResult<Video> = await videoService.get(false, req['user'] ? req['user'].emailAddress : null, req.query.id);

            if (result.hasErrors()) {
                res.status(400).json(result.messages);
                return;
            }

            const video: Video = result.result;

            new ExpressJSVideoHelper(config.paths.base, 50000).send(video.blobLocation, req, res);
        } catch (err) {
            VideoRouter.sendErrorResponse(err, res);
        }
    }

    public static async startUploadForThumbnail(req: express.Request, res: express.Response) {
        try {
            const videoService: VideoService = container.get<VideoService>('VideoService');

            const result: boolean = await videoService.startUploadForThumbnail(req['user'] ? req['user'].emailAddress : null, req.query.id);

            res.json(result);
        } catch (err) {
            VideoRouter.sendErrorResponse(err, res);
        }
    }

    public static async startUploadForVideo(req: express.Request, res: express.Response) {
        try {
            const videoService: VideoService = container.get<VideoService>('VideoService');

            const result: boolean = await videoService.startUploadForVideo(req['user'] ? req['user'].emailAddress : null, req.query.id);

            res.json(result);
        } catch (err) {
            VideoRouter.sendErrorResponse(err, res);
        }
    }

}
