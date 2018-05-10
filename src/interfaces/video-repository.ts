import { Video } from '../entities/video';

export interface IVideoRepository {

    create(video: Video): Promise<Video>;

    find(id: string): Promise<Video>;

    list(profileName: string): Promise<Video[]>;

    update(video: Video): Promise<Video>;

}
