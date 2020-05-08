import { injectable, inject } from 'tsyringe';

// import User from '@modules/users/infra/typeorm/entities/userModel';
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

    this.tokenRepository.generate(user.id);

    this.mailProvider.sendMail(email, 'Redefina sua senha');
  }
}

export default CreateUserService;
