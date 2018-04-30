import { injectable } from 'inversify';
import { Video } from '../../entities/video';
import { IVideoRepository } from '../../interfaces/video-repository';

@injectable()
export class VideoRepository implements IVideoRepository {

    protected static videos: Video[] = [
        new Video(
            'video-1.file',
            'chris-ramsay-video-id-1',
            // tslint:disable-next-line:max-line-length
            `In today's video, I get stumped by an impossible puzzle, I see impossible magic and hang out with the master of impossible things, consultant to David Blaine and all around generous and humble human being, Garrett Thomas! Garrett lectured last night and I caught some of it on video! Enjoy and Go follow GT!`,
            'chris-ramsay',
            // tslint:disable-next-line:max-line-length
            `In today's video, I get stumped by an impossible puzzle, I see impossible magic and hang out with the master of impossible things, consultant to David Blaine and all around generous and humble human being, Garrett Thomas! Garrett lectured last night and I caught some of it on video! Enjoy and Go follow GT!`,
            74338401,
            'thumbnail-1.file',
            'An IMPOSSIBLE Puzzle and UNEXPLAINABLE Magic!!'),
        new Video(
            'video-2.file',
            'chris-ramsay-video-id-2',
            // tslint:disable-next-line:max-line-length
            `Today I'm going to attempt to solve this level 9 Viking puzzle, hand made by Jean-Claude Constantin. It is a sequential puzzle where the aim is to slide out the piece holding the top together.`,
            'chris-ramsay',
            // tslint:disable-next-line:max-line-length
            `Today I'm going to attempt to solve this level 9 Viking puzzle, hand made by Jean-Claude Constantin. It is a sequential puzzle where the aim is to slide out the piece holding the top together.`,
            74338401,
            'thumbnail-2.file',
            'Solving the GENIUS Viking Puzzle'),
        new Video(
            'video-3.file',
            'chris-ramsay-video-id-3',
            // tslint:disable-next-line:max-line-length
            `YO! Today I decided to go out and perform some magic in the streets...`,
            'chris-ramsay',
            // tslint:disable-next-line:max-line-length
            `YO! Today I decided to go out and perform some magic in the streets...`,
            74338401,
            'thumbnail-3.file',
            'A Demonstration of MIND CONTROL'),
    ];

    constructor() {
    }

    public async find(id: string): Promise<Video> {
        const result: Video = VideoRepository.videos.find((video: Video) => video.id === id);

        return result ? result.clone() : null;
    }

    public async list(profileName: string): Promise<Video[]> {
        const result: Video[] = VideoRepository.videos.filter((video: Video) => video.profileName === profileName);

        return result ? result.map((video: Video) => video.clone()) : null;
    }

}
