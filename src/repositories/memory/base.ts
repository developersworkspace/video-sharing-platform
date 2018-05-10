import * as uuid from 'uuid';

export class BaseRepository {

    protected static counter: number = 0;

    public static nextNumericId(): number {
        BaseRepository.counter ++;

        return BaseRepository.counter;
    }

    public static nextStringId(): string {
        return uuid.v4();
    }

}
