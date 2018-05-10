import { Profile } from '../entities/profile';

export interface IProfileRepository {

    create(profile: Profile): Promise<Profile>;
    
    find(userId: string): Promise<Profile>;

    findById(id: string): Promise<Profile>;

    findByName(name: string): Promise<Profile>;

    update(profile: Profile): Promise<Profile>;
}
