import * as fs from 'fs';
import { inject, injectable } from 'inversify';
import { OperationResult } from 'majuro';
import * as path from 'path';
import * as uuid from 'uuid';
import { Constants } from '../constants';
import { Profile } from '../entities/profile';
import { User } from '../entities/user';
import { Video } from '../entities/video';
import { IProfileRepository } from '../interfaces/profile-repository';
import { IStorageGateway } from '../interfaces/storage-gateway';
import { IUserRepository } from '../interfaces/user-repository';
import { IVideoRepository } from '../interfaces/video-repository';
import { SubscriptionService } from './subscription';

@injectable()
export class VideoService {

    constructor(
        @inject('IProfileRepository')
        protected profileRepository: IProfileRepository,
        @inject('IStorageGateway')
        protected storageGateway: IStorageGateway,
        @inject('SubscriptionService')
        protected subscriptionService: SubscriptionService,
        @inject('IUserRepository')
        protected userRepository: IUserRepository,
        @inject('IVideoRepository')
        protected videoRepository: IVideoRepository,
    ) {

    }

    public async appendUploadForThumbnail(buffer: Buffer, emailAddress: string, id: string, offset: number): Promise<OperationResult<boolean>> {
        const operationResult: OperationResult<boolean> = new OperationResult(null);

        const video: Video = await this.videoRepository.find(id);

        if (!video) {
            operationResult.addMessage(Constants.ERROR_CODES_VIDEO_NOT_FOUND, null, `Video with id '${id}' not found`);
            return operationResult;
        }

        const profile: Profile = await this.profileRepository.findByName(video.profileName);

        if (!profile) {
            operationResult.addMessage(Constants.ERROR_CODES_PROFILE_NOT_FOUND, null, `Profile with name '${video.profileName}' not found`);
            return operationResult;
        }

        const user: User = await this.userRepository.findById(profile.userId);

        if (!user) {
            operationResult.addMessage(Constants.ERROR_CODES_USER_NOT_FOUND, null, `User with id '${profile.userId}' not found`);
            return operationResult;
        }

        if (emailAddress !== user.emailAddress) {
            operationResult.addMessage(Constants.ERROR_CODES_UNAUTHORIZED, null, `User cannot modify another user's video`);
            return operationResult;
        }

        await this.storageGateway.append(buffer, `${user.id}-${profile.id}-${video.id}-thumbnail.file`, offset);

        operationResult.setResult(true);

        return operationResult;
    }

    public async appendUploadForVideo(buffer: Buffer, emailAddress: string, id: string, offset: number): Promise<OperationResult<boolean>> {
        const operationResult: OperationResult<boolean> = new OperationResult(null);

        const video: Video = await this.videoRepository.find(id);

        if (!video) {
            operationResult.addMessage(Constants.ERROR_CODES_VIDEO_NOT_FOUND, null, `Video with id '${id}' not found`);
            return operationResult;
        }

        const profile: Profile = await this.profileRepository.findByName(video.profileName);

        if (!profile) {
            operationResult.addMessage(Constants.ERROR_CODES_PROFILE_NOT_FOUND, null, `Profile with name '${video.profileName}' not found`);
            return operationResult;
        }

        const user: User = await this.userRepository.findById(profile.userId);

        if (!user) {
            operationResult.addMessage(Constants.ERROR_CODES_USER_NOT_FOUND, null, `User with id '${profile.userId}' not found`);
            return operationResult;
        }

        if (emailAddress !== user.emailAddress) {
            operationResult.addMessage(Constants.ERROR_CODES_UNAUTHORIZED, null, `User cannot modify another user's video`);
            return operationResult;
        }

        if (offset >= video.size) {
            operationResult.addMessage(Constants.ERROR_CODES_VIDEO_SIZE_EXCEEDED, null, `Video size exceeded`);
            return operationResult;
        }

        if (offset + buffer.length > video.size) {
            operationResult.addMessage(Constants.ERROR_CODES_VIDEO_SIZE_EXCEEDED, null, `Video size exceeded`);
            return operationResult;
        }

        await this.storageGateway.append(buffer, `${user.id}-${profile.id}-${video.id}-video.file`, offset);

        operationResult.setResult(true);

        return operationResult;
    }

    public async create(emailAddress: string, video: Video): Promise<OperationResult<Video>> {
        const operationResult: OperationResult<Video> = new OperationResult(null);

        const profile: Profile = await this.profileRepository.findByName(video.profileName);

        if (!profile) {
            operationResult.addMessage(Constants.ERROR_CODES_PROFILE_NOT_FOUND, null, `Profile with name '${video.profileName}' not found`);
            return operationResult;
        }

        const user: User = await this.userRepository.findById(profile.userId);

        if (!user) {
            operationResult.addMessage(Constants.ERROR_CODES_USER_NOT_FOUND, null, `User with id '${profile.userId}' not found`);
            return operationResult;
        }

        if (emailAddress !== user.emailAddress) {
            operationResult.addMessage(Constants.ERROR_CODES_UNAUTHORIZED, null, `User cannot modify another user's video`);
            return operationResult;
        }

        video = await this.videoRepository.create(video);

        operationResult.setResult(video);

        return operationResult;
    }

    public async endUploadForThumbnail(emailAddress: string, id: string): Promise<OperationResult<string>> {
        const operationResult: OperationResult<string> = new OperationResult<string>(null);

        const video: Video = await this.videoRepository.find(id);

        if (!video) {
            operationResult.addMessage(Constants.ERROR_CODES_VIDEO_NOT_FOUND, null, `Video with id '${id}' not found`);

            return operationResult;
        }

        const profile: Profile = await this.profileRepository.findByName(video.profileName);

        if (!profile) {
            operationResult.addMessage(Constants.ERROR_CODES_PROFILE_NOT_FOUND, null, `Profile with name '${video.profileName}' not found`);

            return operationResult;
        }

        const user: User = await this.userRepository.findById(profile.userId);

        if (!user) {
            operationResult.addMessage(Constants.ERROR_CODES_USER_NOT_FOUND, null, `User with id '${profile.userId}' not found`);

            return operationResult;
        }

        if (emailAddress !== user.emailAddress) {
            return null;
        }

        await this.storageGateway.delete(video.thumbnailLocation);

        const thumbnailLocation: string = `${uuid.v4()}.file`;

        await this.storageGateway.copy(`${user.id}-${profile.id}-${video.id}-thumbnail.file`, thumbnailLocation);

        // await this.storageGateway.delete(`${user.id}-${profile.id}-${video.id}-thumbnail.file`);

        video.thumbnailLocation = thumbnailLocation;

        await this.videoRepository.update(video);

        operationResult.setResult(thumbnailLocation);

        return operationResult;
    }

    public async endUploadForVideo(emailAddress: string, id: string): Promise<OperationResult<string>> {
        const operationResult: OperationResult<string> = new OperationResult<string>(null);

        const video: Video = await this.videoRepository.find(id);

        if (!video) {
            operationResult.addMessage(Constants.ERROR_CODES_VIDEO_NOT_FOUND, null, `Video with id '${id}' not found`);

            return operationResult;
        }

        const profile: Profile = await this.profileRepository.findByName(video.profileName);

        if (!profile) {
            operationResult.addMessage(Constants.ERROR_CODES_PROFILE_NOT_FOUND, null, `Profile with name '${video.profileName}' not found`);

            return operationResult;
        }

        const user: User = await this.userRepository.findById(profile.userId);

        if (!user) {
            operationResult.addMessage(Constants.ERROR_CODES_USER_NOT_FOUND, null, `User with id '${profile.userId}' not found`);

            return operationResult;
        }

        if (emailAddress !== user.emailAddress) {
            return null;
        }

        await this.storageGateway.delete(video.blobLocation);

        const blobLocation: string = `${uuid.v4()}.file`;

        await this.storageGateway.copy(`${user.id}-${profile.id}-${video.id}-video.file`, blobLocation);

        // await this.storageGateway.delete(`${user.id}-${profile.id}-${video.id}-thumbnail.file`);

        video.blobLocation = blobLocation;

        await this.videoRepository.update(video);

        operationResult.setResult(blobLocation);

        return operationResult;
    }

    public async get(anonymous: boolean, emailAddress: string, id: string): Promise<OperationResult<Video>> {
        const operationResult: OperationResult<Video> = new OperationResult(null);

        const video: Video = await this.videoRepository.find(id);

        if (!video) {
            operationResult.addMessage(Constants.ERROR_CODES_VIDEO_NOT_FOUND, null, `Video with id '${id}' not found`);
            return operationResult;
        }

        const profile: Profile = await this.profileRepository.findByName(video.profileName);

        if (!profile) {
            operationResult.addMessage(Constants.ERROR_CODES_PROFILE_NOT_FOUND, null, `Profile with name '${video.profileName}' not found`);
            return operationResult;
        }

        const user: User = await this.userRepository.findById(profile.userId);

        if (!user) {
            operationResult.addMessage(Constants.ERROR_CODES_USER_NOT_FOUND, null, `User with id '${profile.userId}' not found`);
            return operationResult;
        }

        if (emailAddress === user.emailAddress) {
            operationResult.setResult(video);

            return operationResult;
        }

        if (anonymous) {
            operationResult.setResult(video);

            return operationResult;
        }

        // const isSubscriptionPaid: boolean = await this.subscriptionService.isPaid(emailAddress);

        // if (!isSubscriptionPaid) {
        //     operationResult.addMessage('unathorized', null, `Subscription not paid for '${emailAddress}'`);

        //     return operationResult;
        // }

        operationResult.setResult(video);

        return operationResult;
    }

    public async list(emailAddress: string, profileName: string): Promise<Video[]> {
        return this.videoRepository.list(profileName);
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

        const user: User = await this.userRepository.findById(profile.userId);

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

        const user: User = await this.userRepository.findById(profile.userId);

        if (!user) {
            return false;
        }

        if (emailAddress !== user.emailAddress) {
            return false;
        }

        return true;
    }

    public async update(emailAddress: string, video: Video): Promise<OperationResult<Video>> {
        const operationResult: OperationResult<Video> = new OperationResult(null);

        const profile: Profile = await this.profileRepository.findByName(video.profileName);

        if (!profile) {
            operationResult.addMessage(Constants.ERROR_CODES_PROFILE_NOT_FOUND, null, `Profile with name '${video.profileName}' not found`);
            return operationResult;
        }

        const user: User = await this.userRepository.findById(profile.userId);

        if (!user) {
            operationResult.addMessage(Constants.ERROR_CODES_USER_NOT_FOUND, null, `User with id '${profile.userId}' not found`);
            return operationResult;
        }

        if (emailAddress !== user.emailAddress) {
            operationResult.addMessage(Constants.ERROR_CODES_UNAUTHORIZED, null, `User cannot modify another user's video`);
            return operationResult;
        }

        const existingVideo: Video = await this.videoRepository.find(video.id);

        if (!existingVideo) {
            operationResult.addMessage(Constants.ERROR_CODES_VIDEO_NOT_FOUND, null, `Video with id '${video.id}' not found`);
            return operationResult;
        }

        existingVideo.datePublished = video.datePublished;
        existingVideo.longDescription = video.longDescription;
        existingVideo.shortDescription = video.shortDescription;
        existingVideo.title = video.title;

        video = await this.videoRepository.update(existingVideo);

        operationResult.setResult(video);

        return operationResult;
    }

}
