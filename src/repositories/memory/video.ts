import { Video } from '../../entities/video';
import { IVideoRepository } from '../../interfaces/video-repository';

export class VideoRepository implements IVideoRepository {

    protected videos: Video[] = null;

    constructor() {
        this.videos = [
            new Video(
                'video.file',
                1,
                // tslint:disable-next-line:max-line-length
                ` <h2> An IMPOSSIBLE Puzzle and UNEXPLAINABLE Magic!!</h2> <p> In today's video, I get stumped by an impossible puzzle, I see impossible magic and hang out with the master of impossible things, consultant to David Blaine and all around generous and humble human being, Garrett Thomas! Garrett lectured last night and I caught some of it on video! Enjoy and Go follow GT! </p><p> </p><ul> <li> MY CAMERA: <a href="http://amzn.to/2D0bVtU">http://amzn.to/2D0bVtU</a> </li><li> BEST LENS FOR VLOGS: <a href="http://amzn.to/2DeNzth">http://amzn.to/2DeNzth</a> </li><li> BIG LENS FOR B-ROLL: <a href="http://amzn.to/2ANaqcA">http://amzn.to/2ANaqcA</a> </li><li> TOP DOWN CAM: <a href="http://amzn.to/2COakmY">http://amzn.to/2COakmY</a> </li><li> MIC: <a href="http://amzn.to/2AKIHJQ">http://amzn.to/2AKIHJQ</a> </li><li> TRIPOD: <a href="http://amzn.to/2EuP9GO">http://amzn.to/2EuP9GO</a> </li></ul> `, `In today's video, I get stumped by an impossible puzzle, I see impossible magic and hang out with the master of impossible things, consultant to David Blaine and all around generous and humble human being, Garrett Thomas! Garrett lectured last night and I caught some of it on video! Enjoy and Go follow GT!`,
                74338401,
                'thumbnail.file',
                'An IMPOSSIBLE Puzzle and UNEXPLAINABLE Magic!!'),
        ];
    }

    public async find(id: number): Promise<Video> {
        return this.videos.find((video: Video) => video.id === id);
    }

}
