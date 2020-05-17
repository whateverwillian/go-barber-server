import AppError from '@shared/errors/AppError';
import CacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeBCryptHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('should be able to create an user', async () => {
    const fakeRepository = new FakeRepository();
    const fakeHashProvider = new FakeHashProvider();
    const fakeCacheProvider = new CacheProvider();
    const CreateUser = new CreateUserService(
      fakeRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );

    const userCreated = await CreateUser.execute({
      name: 'Willian',
      email: 'teste@gmail.com',
      password: 'test1234',
    });

    expect(userCreated).toHaveProperty('id');
    expect(userCreated.name).toBe('Willian');
  });

  it('should not be able to create two users with the same email address', async () => {
    const fakeRepository = new FakeRepository();
    const fakeHashProvider = new FakeHashProvider();
    const fakeCacheProvider = new CacheProvider();

    const CreateUser = new CreateUserService(
      fakeRepository,
      fakeHashProvider,
      fakeCacheProvider,
    );

    await CreateUser.execute({
      name: 'Willian',
      email: 'teste@gmail.com',
      password: 'test1234',
    });

    await expect(
      CreateUser.execute({
        name: 'Karina',
        email: 'teste@gmail.com',
        password: 'test1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
