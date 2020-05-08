import { uuid } from 'uuidv4';
import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeBCryptHashProvider';

let fakeUserRepository: FakeUserRepository;
let fakeUserTokenRepository: FakeUserTokenRepository;
let resetPassword: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeUserTokenRepository = new FakeUserTokenRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUserRepository,
      fakeUserTokenRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password: 'test1234',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    await resetPassword.execute({
      password: 'test1212',
      token,
    });

    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(updatedUser?.password).toBe('test1212');
  });

  it('should not be able to reset the password without a valid token', async () => {
    await expect(
      resetPassword.execute({
        password: 'test1212',
        token: uuid(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if the user dont exists', async () => {
    const { token } = await fakeUserTokenRepository.generate('testID');

    await expect(
      resetPassword.execute({
        password: 'test1212',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should encrypt new password', async () => {
    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    const user = await fakeUserRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password: 'test1234',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    await resetPassword.execute({
      password: 'test1212',
      token,
    });

    expect(generateHash).toBeCalledWith('test1212');
  });

  it('should not be able to reset password after 1 hour', async () => {
    const user = await fakeUserRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password: 'test1234',
    });

    const { token } = await fakeUserTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 2);
    });

    await expect(
      resetPassword.execute({
        password: 'test1234',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
