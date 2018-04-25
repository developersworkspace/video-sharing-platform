export class Video {

    constructor(
        public blobLocation: string,
        public id: string,
        public longDescription: string,
        public profileName: string,
        public shortDescription: string,
        public size: number,
        public thumbnailLocation: string,
        public title: string,
    ) {

    }
}
