import { IClonable } from '../interfaces/clonable';

export class Video implements IClonable<Video> {

    constructor(
        public blobLocation: string,
        public datePublished: Date,
        public id: string,
        public longDescription: string,
        public profileName: string,
        public shortDescription: string,
        public size: number,
        public thumbnailLocation: string,
        public title: string,
    ) {

    }

    public clone(): Video {
        return new Video(
            this.blobLocation,
            this.datePublished,
            this.id,
            this.longDescription,
            this.profileName,
            this.shortDescription,
            this.size,
            this.thumbnailLocation,
            this.title,
        );
    }

    public static fromJSON(json: any): Video {
        return new Video(
            json.blobLocation,
            json.datePublished,
            json.id,
            json.longDescription,
            json.profileName,
            json.shortDescription,
            json.size,
            json.thumbnailLocation,
            json.title,
        );
    }

}
