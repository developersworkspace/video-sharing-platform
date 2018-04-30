import { IClonable } from '../interfaces/clonable';

export class SocialDetails implements IClonable<SocialDetails> {

    constructor(
        public facebook: string,
        public instagram: string,
        public twitter: string,
    ) {

    }

    public clone(): SocialDetails {
        return new SocialDetails(this.facebook, this.instagram, this.twitter);
    }

}
