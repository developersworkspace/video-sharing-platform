import * as crypto from 'crypto';
import * as fs from 'fs-extra';
import * as path from 'path';
import { Stream } from 'stream';
import { IStorageGateway } from '../interfaces/storage-gateway';

export class FileSystemStorageGateway implements IStorageGateway {

    constructor(
        protected basePath: string,
    ) {

    }

    public async append(buffer: Buffer, fileName: string, offset: number): Promise<void> {
        const directory: string = path.dirname(path.join(this.basePath, fileName));

        await this.ensureDirectoryExist(directory);

        await this.appendFile(path.join(this.basePath, fileName), offset, buffer);
    }

    public computeHash(fileName: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const hash = crypto.createHash('md5');
            const stream = fs.createReadStream(path.join(this.basePath, fileName));

            stream.on('data', (data: Buffer) => {
                hash.update(data, 'utf8');
            });

            stream.on('end', () => {
                const result: string = hash.digest('hex');
                resolve(result);
            });
        });
    }

    public async copy(from: string, to: string): Promise<void> {
        // TODO:
        fs.createReadStream(path.join(this.basePath, from)).pipe(fs.createWriteStream(path.join(this.basePath, to)));
    }

    public async delete(fileName: string): Promise<void> {
        if (fs.existsSync(fileName)) {
            await fs.remove(fileName);
        }
    }

    public async getStream(end: number, fileName: string, start: number): Promise<Stream> {
        return fs.createReadStream(path.join(this.basePath, fileName), {
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
