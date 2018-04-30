import { IClonable } from '../interfaces/clonable';
import { Address } from '../value-objects/address';
import { ContactDetails } from '../value-objects/contact-details';
import { SocialDetails } from '../value-objects/social-details';

export class Profile implements IClonable<Profile> {

    constructor(
        public address: Address,
        public contactDetails: ContactDetails,
        public description: string,
        public id: string,
        public message: string,
        public name: string,
        public socialDetails: SocialDetails,
        public userId: string,
    ) {

    }

    public clone(): Profile {
        return new Profile(
            this.address.clone(),
            this.contactDetails.clone(),
            this.description,
            this.id,
            this.message,
            this.name,
            this.socialDetails.clone(),
            this.userId,
        );
    }

    public static fromJSON(json: any): Profile {
        return new Profile(
            new Address(json.address.city, json.address.country),
            new ContactDetails(json.contactDetails.emailAddress, json.contactDetails.phoneNumber),
            json.description,
            json.id,
            json.message,
            json.name,
            new SocialDetails(json.socialDetails.facebook, json.socialDetails.instagram, json.socialDetails.twitter),
            json.userId,
        );
    }

}
