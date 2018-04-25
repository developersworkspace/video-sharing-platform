import { Container, interfaces } from 'inversify';
import 'reflect-metadata';
import { ProfileService } from './services/profile';
import { UserService } from './services/user';

const container: Container = new Container();

container.bind<ProfileService>('ProfileService').to(ProfileService);
container.bind<UserService>('UserService').to(UserService);

export {
    container,
};
