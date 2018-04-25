import * as fs from 'fs';
import { OperationResult } from 'majuro';
import * as path from 'path';
import { Stream } from 'stream';
import { Profile } from '../entities/profile';
import { User } from '../entities/user';
import { Video } from '../entities/video';
import { IProfileRepository } from '../interfaces/profile-repository';
import { IStorageGateway } from '../interfaces/storage-gateway';
import { IUserRepository } from '../interfaces/user-repository';
import { IVideoRepository } from '../interfaces/video-repository';
import { SubscriptionService } from './subscription';

export class VideoService {

    constructor(
        protected profileRepository: IProfileRepository,
        protected storageGateway: IStorageGateway,
        protected subscriptionService: SubscriptionService,
        protected userRepository: IUserRepository,
        protected videoRepository: IVideoRepository,
    ) {

    }

    public async appendUploadForThumbnail(buffer: Buffer, emailAddress: string, id: string, offset: number): Promise<OperationResult<boolean>> {
        const operationResult: OperationResult<boolean> = new OperationResult(null);

        const video: Video = await this.videoRepository.find(id);

        if (!video) {
            operationResult.addMessage('video_not_found', null, `Video with id ${id} not found`);
            return operationResult;
        }

        const profile: Profile = await this.profileRepository.findByName(video.profileName);

        if (!profile) {
            operationResult.addMessage('profile_not_found', null, `Profile with name ${video.profileName} not found`);
            return operationResult;
        }

        const user: User = await this.userRepository.find(profile.userId);

        if (!user) {
            operationResult.addMessage('user_not_found', null, `Profile with id ${profile.userId} not found`);
            return operationResult;
        }

        if (emailAddress !== user.emailAddress) {
            operationResult.addMessage('unauthorized', null, `User cannot modify another user's video`);
            return operationResult;
        }

        await this.storageGateway.append(buffer, video.thumbnailLocation, offset);

        operationResult.setResult(true);

        return operationResult;
    }

    public async appendUploadForVideo(buffer: Buffer, emailAddress: string, id: string, offset: number): Promise<OperationResult<boolean>> {
        const operationResult: OperationResult<boolean> = new OperationResult(null);

        const video: Video = await this.videoRepository.find(id);

        if (!video) {
            operationResult.addMessage('video_not_found', null, `Video with id ${id} not found`);
            return operationResult;
        }

        const profile: Profile = await this.profileRepository.findByName(video.profileName);

        if (!profile) {
            operationResult.addMessage('profile_not_found', null, `Profile with name ${video.profileName} not found`);
            return operationResult;
        }

        const user: User = await this.userRepository.find(profile.userId);

        if (!user) {
            operationResult.addMessage('user_not_found', null, `Profile with id ${profile.userId} not found`);
            return operationResult;
        }

        if (emailAddress !== user.emailAddress) {
            operationResult.addMessage('unauthorized', null, `User cannot modify another user's video`);
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

    public async get(emailAddress: string, id: string): Promise<OperationResult<Video>> {
        const operationResult: OperationResult<Video> = new OperationResult(null);

        const video: Video = await this.videoRepository.find(id);

        if (!video) {
            operationResult.addMessage('video_not_found', null, `Video with id ${id} not found`);
            return operationResult;
        }

        const profile: Profile = await this.profileRepository.findByName(video.profileName);

        if (!profile) {
            operationResult.addMessage('profile_not_found', null, `Profile with name ${video.profileName} not found`);
            return operationResult;
        }

        const user: User = await this.userRepository.find(profile.userId);

        if (!user) {
            operationResult.addMessage('user_not_found', null, `Profile with id ${profile.userId} not found`);
            return operationResult;
        }

        if (emailAddress === user.emailAddress) {
            operationResult.setResult(video);

            return operationResult;
        }

        const isSubcriptionPaid: boolean = await this.subscriptionService.isPaid(emailAddress);

        if (!isSubcriptionPaid) {
            operationResult.addMessage('unathorized', null, `Subscription not paid for ${emailAddress}`);

            return operationResult;
        }

        operationResult.setResult(video);

        return operationResult;
    }

    public async getStream(emailAddress: string, end: number, id: string, start: number): Promise<OperationResult<Stream>> {
        const operationResult: OperationResult<Stream> = new OperationResult(null);

        const video: Video = await this.videoRepository.find(id);

        if (!video) {
            operationResult.addMessage('video_not_found', null, `Video with id ${id} not found`);
            return operationResult;
        }

        const profile: Profile = await this.profileRepository.findByName(video.profileName);

        if (!profile) {
            operationResult.addMessage('profile_not_found', null, `Profile with name ${video.profileName} not found`);
            return operationResult;
        }

        const user: User = await this.userRepository.find(profile.userId);

        if (!user) {
            operationResult.addMessage('user_not_found', null, `Profile with id ${profile.userId} not found`);
            return operationResult;
        }

        let stream: Stream = null;

        if (emailAddress === user.emailAddress) {
            stream = await this.storageGateway.getStream(end, video.blobLocation, start);

            operationResult.setResult(stream);

            return operationResult;
        }

        const isSubcriptionPaid: boolean = await this.subscriptionService.isPaid(emailAddress);

        if (!isSubcriptionPaid) {
            operationResult.addMessage('unathorized', null, `Subscription not paid for ${emailAddress}`);

            return operationResult;
        }

        stream = await this.storageGateway.getStream(end, video.blobLocation, start);

        operationResult.setResult(stream);

        return operationResult;
    }

    public async endUploadForThumbnail(emailAddress: string, id: string): Promise<boolean> {
        const video: Video = await this.videoRepository.find(id);

        if (!video) {
            return false;
        }

        const profile: Profile = await this.profileRepository.findByName(video.profileName);

        if (!profile) {
            return false;
        }

        const user: User = await this.userRepository.find(profile.userId);

        if (!user) {
            return false;
        }

        if (emailAddress !== user.emailAddress) {
            return false;
        }

        return true;
    }

    public async endUploadForVideo(emailAddress: string, id: string): Promise<boolean> {
        const video: Video = await this.videoRepository.find(id);

        if (!video) {
            return false;
        }

        const profile: Profile = await this.profileRepository.findByName(video.profileName);

        if (!profile) {
            return false;
        }

        const user: User = await this.userRepository.find(profile.userId);

        if (!user) {
            return false;
        }

        if (emailAddress !== user.emailAddress) {
            return false;
        }

        return true;
    }

    public async startUploadForThumbnail(emailAddress: string, id: string): Promise<boolean> {
        const video: Video = await this.videoRepository.find(id);

        if (!video) {
            return false;
        }

        const profile: Profile = await this.profileRepository.findByName(video.profileName);

        if (!profile) {
            return false;
        }

        const user: User = await this.userRepository.find(profile.userId);

        if (!user) {
            return false;
        }

        if (emailAddress !== user.emailAddress) {
            return false;
        }

        return true;
    }

    public async startUploadForVideo(emailAddress: string, id: string): Promise<boolean> {
        const video: Video = await this.videoRepository.find(id);

        if (!video) {
            return false;
        }

        const profile: Profile = await this.profileRepository.findByName(video.profileName);

        if (!profile) {
            return false;
        }

        const user: User = await this.userRepository.find(profile.userId);

        if (!user) {
            return false;
        }

        if (emailAddress !== user.emailAddress) {
            return false;
        }

        return true;
    }

}
