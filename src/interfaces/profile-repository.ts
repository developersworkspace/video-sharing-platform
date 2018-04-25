import { Profile } from '../entities/profile';

export interface IProfileRepository {

    find(emailAddress: string): Promise<Profile>;

    findByName(name: string): Promise<Profile>;

}
