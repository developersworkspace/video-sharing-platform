import { Video } from '../entities/video';

export interface IVideoRepository {

    find(id: string): Promise<Video>;

    list(profileName: string): Promise<Video[]>;

}
