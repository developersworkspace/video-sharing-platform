import { injectable } from 'inversify';
import { Video } from '../../entities/video';
import { IVideoRepository } from '../../interfaces/video-repository';
import { BaseRepository } from './base';

@injectable()
export class VideoRepository implements IVideoRepository {

    protected static videos: Video[] = [];

    constructor() {
    }

    public async create(video: Video): Promise<Video> {
        const newVideo: Video = video.clone();

        if (!newVideo.id) {
            newVideo.id = BaseRepository.nextStringId();
        }

        VideoRepository.videos.push(newVideo);

        return newVideo;
    }

    public async findById(videoId: string): Promise<Video> {
        const result: Video = VideoRepository.videos.find((video: Video) => video.id === videoId);

        return result ? result.clone() : null;
    }

    public async list(profileName: string): Promise<Video[]> {
        const result: Video[] = VideoRepository.videos.filter((video: Video) => video.profileName === profileName);

        return result ? result.map((video: Video) => video.clone()) : null;
    }

    public async update(video: Video): Promise<Video> {
        const result: Video = VideoRepository.videos.find((x: Video) => x.id === video.id);

        result.blobLocation = video.blobLocation;
        result.datePublished = video.datePublished;
        result.longDescription = video.longDescription;
        result.shortDescription = video.shortDescription;
        result.size = video.size;
        result.thumbnailLocation = video.thumbnailLocation;
        result.title = video.title;

        return result.clone();
    }

}
