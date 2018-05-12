import { inject, injectable } from 'inversify';
import * as mongo from 'mongodb';
import { Profile } from '../../entities/profile';
import { IProfileRepository } from '../../interfaces/profile-repository';
import { Address } from '../../value-objects/address';
import { ContactDetails } from '../../value-objects/contact-details';
import { SocialDetails } from '../../value-objects/social-details';
import { BaseRepository } from './base';

@injectable()
export class ProfileRepository implements IProfileRepository {

    constructor(
        @inject('BaseRepository')
        protected baseRepository: BaseRepository,
    ) {
    }

    public async create(profile: Profile): Promise<Profile> {
        const newProfile: Profile = profile.clone();

        if (!newProfile.id) {
            newProfile.id = await this.baseRepository.nextStringId();
        }

        const collection: mongo.Collection = await this.baseRepository.getCollection('profiles');

        await collection.insertOne({
            address: {
                city: newProfile.address.city,
                country: newProfile.address.country,
            },
            contactDetails: {
                emailAddress: newProfile.contactDetails.emailAddress,
                phoneNumber: newProfile.contactDetails.phoneNumber,
            },
            description: newProfile.description,
            message: newProfile.message,
            name: newProfile.name,
            socialDetails: {
                facebook: newProfile.socialDetails.facebook,
                instagram: newProfile.socialDetails.instagram,
                twitter: newProfile.socialDetails.twitter,
            },
            stringId: newProfile.id,
            userId: newProfile.userId,
        });

        return newProfile;
    }

    public async findById(profileId: string): Promise<Profile> {
        const collection: mongo.Collection = await this.baseRepository.getCollection('profiles');

        const result: any = await collection.findOne({
            stringId: profileId,
        });

        return result ? new Profile(
            new Address(result.address.city, result.address.country),
            new ContactDetails(result.contactDetails.emailAddress, result.contactDetails.phoneNumber),
            result.description,
            result.stringId,
            result.message,
            result.name,
            new SocialDetails(result.socialDetails.facebook, result.socialDetails.instagram, result.socialDetails.twitter),
            result.userId,
        ) : null;
    }

    public async findByName(name: string): Promise<Profile> {
        const collection: mongo.Collection = await this.baseRepository.getCollection('profiles');

        const result: any = await collection.findOne({
            name,
        });

        return result ? new Profile(
            new Address(result.address.city, result.address.country),
            new ContactDetails(result.contactDetails.emailAddress, result.contactDetails.phoneNumber),
            result.description,
            result.stringId,
            result.message,
            result.name,
            new SocialDetails(result.socialDetails.facebook, result.socialDetails.instagram, result.socialDetails.twitter),
            result.userId,
        ) : null;
    }

    public async findByUserId(userId: string): Promise<Profile> {
        const collection: mongo.Collection = await this.baseRepository.getCollection('profiles');

        const result: any = await collection.findOne({
            userId,
        });

        return result ? new Profile(
            new Address(result.address.city, result.address.country),
            new ContactDetails(result.contactDetails.emailAddress, result.contactDetails.phoneNumber),
            result.description,
            result.stringId,
            result.message,
            result.name,
            new SocialDetails(result.socialDetails.facebook, result.socialDetails.instagram, result.socialDetails.twitter),
            result.userId,
        ) : null;
    }

    public async update(profile: Profile): Promise<Profile> {
        const existingProfile: Profile = await this.findById(profile.id);

        existingProfile.address = profile.address;
        existingProfile.contactDetails = profile.contactDetails;
        existingProfile.description = profile.description;
        existingProfile.message = profile.message;
        existingProfile.name = profile.name;
        existingProfile.socialDetails = profile.socialDetails;

        const collection: mongo.Collection = await this.baseRepository.getCollection('profiles');

        await collection.replaceOne({
            stringId: existingProfile.id,
        }, {
            address: {
                city: existingProfile.address.city,
                country: existingProfile.address.country,
            },
            contactDetails: {
                emailAddress: existingProfile.contactDetails.emailAddress,
                phoneNumber: existingProfile.contactDetails.phoneNumber,
            },
            description: existingProfile.description,
            message: existingProfile.message,
            name: existingProfile.name,
            socialDetails: {
                facebook: existingProfile.socialDetails.facebook,
                instagram: existingProfile.socialDetails.instagram,
                twitter: existingProfile.socialDetails.twitter,
            },
            stringId: existingProfile.id,
            userId: existingProfile.userId,
        });

        return existingProfile;
    }
}
