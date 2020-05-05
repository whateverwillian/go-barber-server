import AppError from '@shared/errors/AppError';
import FakeRepository from '../repositories/fakes/FakeUserRepository';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeRepository = new FakeRepository();
    const CreateUser = new CreateUserService(fakeRepository);
    const AuthenticateUser = new AuthenticateUserService(fakeRepository);

    await CreateUser.execute({
      name: 'Willian',
      email: 'teste@gmail.com',
      password: 'test1234',
    });

    const userAuthenticated = await AuthenticateUser.execute({
      email: 'teste@gmail.com',
      password: 'test1234',
    });

    expect(userAuthenticated).toHaveProperty('token');
  });

  it('should not be able to authenticate with wrong email address', async () => {
    const fakeRepository = new FakeRepository();
    const CreateUser = new CreateUserService(fakeRepository);
    const AuthenticateUser = new AuthenticateUserService(fakeRepository);

    await CreateUser.execute({
      name: 'Willian',
      email: 'teste@gmail.com',
      password: 'test1234',
    });

    expect(
      AuthenticateUser.execute({
        email: 'teste2@gmail.com',
        password: 'test1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeRepository = new FakeRepository();
    const CreateUser = new CreateUserService(fakeRepository);
    const AuthenticateUser = new AuthenticateUserService(fakeRepository);

    await CreateUser.execute({
      name: 'Willian',
      email: 'teste@gmail.com',
      password: 'test1234',
    });

    expect(
      AuthenticateUser.execute({
        email: 'teste@gmail.com',
        password: 'test123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
