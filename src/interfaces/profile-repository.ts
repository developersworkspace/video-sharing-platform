import { Profile } from '../entities/profile';

export interface IProfileRepository {

    create(profile: Profile): Promise<Profile>;

    findById(profileId: string): Promise<Profile>;

    findByName(name: string): Promise<Profile>;

    findByUserId(userId: string): Promise<Profile>;

    update(profile: Profile): Promise<Profile>;
}
