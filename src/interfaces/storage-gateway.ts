import { Stream } from 'stream';

export interface IStorageGateway {

    append(buffer: Buffer, fileName: string, offset: number): Promise<void>;

    computeHash(fileName: string): Promise<string>;

    copy(from: string, to: string): Promise<void>;

    delete(fileName: string): Promise<void>;

    getStream(end: number, fileName: string, start: number): Promise<Stream>;
}
