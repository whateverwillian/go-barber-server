import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import ForgotPasswordService from './ForgotPasswordService';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';

let fakeUserRepository: FakeUserRepository;
let mailProvider: FakeMailProvider;
let fakeUserTokenRepository: FakeUserTokenRepository;
let forgotPassword: ForgotPasswordService;

describe('ForgotPassword', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    mailProvider = new FakeMailProvider();
    fakeUserTokenRepository = new FakeUserTokenRepository();

    forgotPassword = new ForgotPasswordService(
      fakeUserRepository,
      mailProvider,
      fakeUserTokenRepository,
    );
  });

  it('should be able to reset the password', async () => {
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password: 'test1234',
    });

    const email = 'teste@gmail.com';

    await forgotPassword.execute({ email });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to reset password with unregistered email', async () => {
    await expect(
      forgotPassword.execute({
        email: 'teste2@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generate = jest.spyOn(fakeUserTokenRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password: 'test1234',
    });

    await forgotPassword.execute({ email: 'teste@gmail.com' });

    expect(generate).toHaveBeenCalledWith(user.id);
  });
});
