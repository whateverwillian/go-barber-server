import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeBCryptHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password: 'test1',
    });

    const updatedUser = await updateProfile.execute({
      name: 'teste2',
      email: 'teste2@gmail.com',
      user_id: user.id,
    });

    expect(updatedUser.name).toBe('teste2');
    expect(updatedUser.email).toBe('teste2@gmail.com');
  });

  it('should not be able to update an email that already exists', async () => {
    await fakeUserRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password: 'test1',
    });

    const user = await fakeUserRepository.create({
      name: 'teste2',
      email: 'teste2@gmail.com',
      password: 'test2',
    });

    await expect(
      updateProfile.execute({
        name: 'teste2',
        email: 'teste@gmail.com',
        user_id: user.id,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update password', async () => {
    const user = await fakeUserRepository.create({
      name: 'teste2',
      email: 'teste2@gmail.com',
      password: 'test123',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'teste2',
      email: 'teste@gmail.com',
      password: '123123',
      old_password: 'test123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able update password without password confirmation', async () => {
    const user = await fakeUserRepository.create({
      name: 'teste2',
      email: 'teste2@gmail.com',
      password: 'test123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'teste2',
        email: 'teste@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update password wit wrong password', async () => {
    const user = await fakeUserRepository.create({
      name: 'teste2',
      email: 'teste2@gmail.com',
      password: 'test123',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'teste2',
        email: 'teste@gmail.com',
        password: '123123',
        old_password: 'wrong-old-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
