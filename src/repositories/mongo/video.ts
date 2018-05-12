import { inject, injectable } from 'inversify';
import * as mongo from 'mongodb';
import { Video } from '../../entities/video';
import { IVideoRepository } from '../../interfaces/video-repository';
import { BaseRepository } from './base';

@injectable()
export class VideoRepository implements IVideoRepository {

    constructor(
        @inject('BaseRepository')
        protected baseRepository: BaseRepository,
    ) {
    }

    public async create(video: Video): Promise<Video> {
        const newVideo: Video = video.clone();

        if (!newVideo.id) {
            newVideo.id = await this.baseRepository.nextStringId();
        }

        const collection: mongo.Collection = await this.baseRepository.getCollection('videos');

        await collection.insertOne({
            blobLocation: newVideo.blobLocation,
            datePublished: newVideo.datePublished ? newVideo.datePublished.getTime() : null,
            longDescription: newVideo.longDescription,
            profileName: newVideo.profileName,
            shortDescription: newVideo.shortDescription,
            size: newVideo.size,
            stringId: newVideo.id,
            thumbnailLocation: newVideo.thumbnailLocation,
            title: newVideo.title,
        });

        return newVideo;
    }

    public async findById(videoId: string): Promise<Video> {
        const collection: mongo.Collection = await this.baseRepository.getCollection('videos');

        const result: any = await collection.findOne({
            stringId: videoId,
        });

        return result ? new Video(
            result.blobLocation,
            result.datePublished ? new Date(result.datePublished) : null,
            result.stringId,
            result.longDescription,
            result.profileName,
            result.shortDescription,
            result.size,
            result.thumbnailLocation,
            result.title,
        ) : null;
    }

    public async list(profileName: string): Promise<Video[]> {
        const collection: mongo.Collection = await this.baseRepository.getCollection('videos');

        const result: any[] = await collection.find({
            profileName,
        }).toArray();

        return result.map((x: any) => new Video(
            x.blobLocation,
            x.datePublished ? new Date(x.datePublished) : null,
            x.stringId,
            x.longDescription,
            x.profileName,
            x.shortDescription,
            x.size,
            x.thumbnailLocation,
            x.title,
        ));
    }

    public async update(video: Video): Promise<Video> {
        const existingVideo: Video = await this.findById(video.id);

        existingVideo.blobLocation = video.blobLocation;
        existingVideo.datePublished = video.datePublished;
        existingVideo.longDescription = video.longDescription;
        existingVideo.shortDescription = video.shortDescription;
        existingVideo.size = video.size;
        existingVideo.thumbnailLocation = video.thumbnailLocation;
        existingVideo.title = video.title;

        const collection: mongo.Collection = await this.baseRepository.getCollection('videos');

        await collection.replaceOne({
            stringId: existingVideo.id,
        }, {
                blobLocation: existingVideo.blobLocation,
                datePublished: existingVideo.datePublished ? existingVideo.datePublished.getTime() : null,
                longDescription: existingVideo.longDescription,
                profileName: existingVideo.profileName,
                shortDescription: existingVideo.shortDescription,
                size: existingVideo.size,
                stringId: existingVideo.id,
                thumbnailLocation: existingVideo.thumbnailLocation,
                title: existingVideo.title,
            });

        return existingVideo;
    }

}
