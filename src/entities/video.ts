export class Video {

    constructor(
        public blobLocation: string,
        public id: number,
        public longDescription: string,
        public shortDescription: string,
        public size: number,
        public thumbnailLocation: string,
        public title: string,
    ) {

    }
}
