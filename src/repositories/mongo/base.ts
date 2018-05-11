import { ILogger, ObjectPool } from 'majuro';
import * as mongo from 'mongodb';
import * as uuid from 'uuid';

export class BaseRepository {

    protected objectPool: ObjectPool<mongo.MongoClient> = null;

    constructor(
        protected database: string,
        protected host: string,
        protected logger: ILogger,
        protected poolSize: number,
        protected retryTimeout: number,
    ) {
        this.objectPool = new ObjectPool<mongo.MongoClient>(async () => this.newClient(), poolSize);
    }

    public async getCollection(name: string): Promise<mongo.Collection> {
        const database: mongo.Db = await this.getDatabase();

        return database.collection(name);
    }

    public async nextNumericId(): Promise<number> {
        const collection: mongo.Collection = await this.getCollection('meta');

        const result: any = await collection.findOneAndUpdate({
            key: 'next-numeric-id',
        }, {
                $inc: {
                    value: 1,
                },
            });

        if (!result) {
            await collection.insertOne({
                key: 'next-numeric-id',
                value: 2,
            });

            return 1;
        }

        return result.value;
    }

    public async nextStringId(): Promise<string> {
        return uuid.v4();
    }

    protected getClient(): Promise<mongo.MongoClient> {
        return this.objectPool.get();
    }

    protected async getDatabase(): Promise<mongo.Db> {
        const client: mongo.MongoClient = await this.getClient();

        const database: mongo.Db = client.db(this.database);

        return database;
    }

    protected async newClient(): Promise<mongo.MongoClient> {
        try {
            const client: mongo.MongoClient = new mongo.MongoClient(this.host);

            this.logger.debug(`[${__filename}]: connecting to '${this.host}'`);
            await client.connect();
            this.logger.debug(`[${__filename}]: connected to '${this.host}'`);

            return client;

        } catch (error) {
            this.logger.error(error);

            await this.delay(this.retryTimeout);

            return this.newClient();
        }
    }

    private delay(milliseconds: number): Promise<void> {
        return new Promise((resolve: () => void, reject: (error: Error) => void) => {
            setTimeout(resolve, milliseconds);
        });
    }

}
