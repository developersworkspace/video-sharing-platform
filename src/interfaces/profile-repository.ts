import { Profile } from '../entities/profile';

export interface IProfileRepository {

    find(userId: string): Promise<Profile>;

    findByName(name: string): Promise<Profile>;
}
