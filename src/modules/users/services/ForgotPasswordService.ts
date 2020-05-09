import { injectable, inject } from 'tsyringe';
import path from 'path';

import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUserRepository from '../repositories/fakes/FakeUserRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  email: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('TokenRepository')
    private tokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError('User does not exist', 404);

    const { token } = await this.tokenRepository.generate(user.id);

    const file = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[GoBarber] Recuperação de senha',
      templateData: {
        file,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset?token=${token}`,
        },
      },
    });
  }
}

export default CreateUserService;
