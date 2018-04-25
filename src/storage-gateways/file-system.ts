import * as crypto from 'crypto';
import * as fs from 'fs-extra';
import * as path from 'path';
import { Stream } from 'stream';
import { IStorageGateway } from '../interfaces/storage-gateway';

export class FileSystemStorageGateway implements IStorageGateway {

    public async append(buffer: Buffer, fileName: string, offset: number): Promise<void> {
        const directory: string = path.dirname(fileName);

        await this.ensureDirectoryExist(directory);

        await this.appendFile(fileName, offset, buffer);
    }

    public computeHash(fileName: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const hash = crypto.createHash('md5');
            const stream = fs.createReadStream(fileName);

            stream.on('data', (data: Buffer) => {
                hash.update(data, 'utf8');
            });

            stream.on('end', () => {
                const result: string = hash.digest('hex');
                resolve(result);
            });
        });
    }

    public async delete(fileName: string): Promise<void> {
        if (fs.existsSync(fileName)) {
            await fs.remove(fileName);
        }
    }

    public async getStream(end: number, fileName: string, start: number): Promise<Stream> {
        return fs.createReadStream(fileName, {
            end,
            start,
        });
    }

    protected async appendFile(fileName: string, offset: number, buffer: Buffer): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const fileStream = fs.createWriteStream(fileName, {
                flags: 'a',
                start: offset,
            });

            fileStream.write(buffer, () => {
                fileStream.close();

                resolve();
            });
        });
    }

    protected async ensureDirectoryExist(directory: string): Promise<void> {
        return fs.ensureDir(directory);
    }

}
