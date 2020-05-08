import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeBCryptHashProvider';

import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUser', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const CreateUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const AuthenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

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
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const AuthenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    expect(
      AuthenticateUser.execute({
        email: 'teste2@gmail.com',
        password: 'test1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const CreateUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const AuthenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await CreateUser.execute({
      name: 'Willian',
      email: 'teste@gmail.com',
      password: 'test1234',
    });

    await expect(
      AuthenticateUser.execute({
        email: 'teste@gmail.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
