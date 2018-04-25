import { Video } from '../entities/video';

export interface IVideoRepository {

    find(id: number): Promise<Video>;

}
