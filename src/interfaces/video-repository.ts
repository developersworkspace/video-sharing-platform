import { Video } from '../entities/video';

export interface IVideoRepository {

    find(id: string): Promise<Video>;

    list(profileName: string): Promise<Video[]>;

    update(video: Video): Promise<Video>;

}
