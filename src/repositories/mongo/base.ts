import { ObjectPool } from 'majuro';
import * as mongo from 'mongodb';
import * as uuid from 'uuid';

export class BaseRepository {

    protected objectPool: ObjectPool<mongo.MongoClient> = null;

    constructor(protected database: string, protected host: string) {
        this.objectPool = new ObjectPool<mongo.MongoClient>(async () => {
            return this.newClient();
        }, 10);
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
        const client: mongo.MongoClient = new mongo.MongoClient(this.host);

        await client.connect();

        return client;
    }

}
