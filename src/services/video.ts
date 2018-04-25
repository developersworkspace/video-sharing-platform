import * as fs from 'fs';
import { OperationResult } from 'majuro';
import * as path from 'path';
import { Video } from '../entities/video';
import { IStorageGateway } from '../interfaces/storage-gateway';
import { IVideoRepository } from '../interfaces/video-repository';

export class VideoService {

    constructor(
        protected storageGateway: IStorageGateway,
        protected videoRepository: IVideoRepository,
    ) {

    }

    public async startUpload(id: number): Promise<boolean> {
        const video: Video = await this.videoRepository.find(id);

        if (!video) {
            return false;
        }

        return true;
    }

    public async appendUpload(buffer: Buffer, id: number, offset: number): Promise<OperationResult<boolean>> {
        const operationResult: OperationResult<boolean> = new OperationResult(null);

        const video: Video = await this.videoRepository.find(id);

        if (!video) {
            operationResult.addMessage('video_not_found', null, `Video with id ${id} not found`);
            return operationResult;
        }

        if (offset >= video.size) {
            operationResult.addMessage('video_size_exceeded', null, `Video size exceeded`);
            return operationResult;
        }

        if (offset + buffer.length > video.size) {
            operationResult.addMessage('video_size_exceeded', null, `Video size exceeded`);
            return operationResult;
        }

        await this.storageGateway.append(buffer, video.blobLocation, offset);

        operationResult.setResult(true);

        return operationResult;
    }

    public async endUpload(id: number): Promise<boolean> {
        const video: Video = await this.videoRepository.find(id);

        if (!video) {
            return false;
        }

        return true;
    }

}
