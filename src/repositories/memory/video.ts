import { Video } from '../../entities/video';
import { IVideoRepository } from '../../interfaces/video-repository';

export class VideoRepository implements IVideoRepository {

    protected videos: Video[] = null;

    constructor() {
        this.videos = [
            new Video(
                'video.file',
                'chris-ramsay-video-id-1',
                // tslint:disable-next-line:max-line-length
                `In today's video, I get stumped by an impossible puzzle, I see impossible magic and hang out with the master of impossible things, consultant to David Blaine and all around generous and humble human being, Garrett Thomas! Garrett lectured last night and I caught some of it on video! Enjoy and Go follow GT!`,
                'chris-ramsay',
                'short',
                74338401,
                'thumbnail.file',
                'An IMPOSSIBLE Puzzle and UNEXPLAINABLE Magic!!'),
        ];
    }

    public async find(id: string): Promise<Video> {
        return this.videos.find((video: Video) => video.id === id);
    }

}
