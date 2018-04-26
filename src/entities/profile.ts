import { Address } from '../value-objects/address';
import { ContactDetails } from '../value-objects/contact-details';
import { SocialDetails } from '../value-objects/social-details';

export class Profile {

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

}
