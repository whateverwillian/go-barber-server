import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import IUserRepository from '../repositories/fakes/FakeUserRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('TokenRepository')
    private tokenRepository: IUserTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.tokenRepository.findByToken(token);

    if (!userToken) throw new AppError('You need a valid token');

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) throw new AppError('User does not exist');

    const tokenExpires = addHours(userToken.created_at, 1);

    if (isAfter(Date.now(), tokenExpires))
      throw new AppError('Sorry, token expired');

    user.password = await this.hashProvider.generateHash(password);
    this.userRepository.save(user);

    await this.tokenRepository.delete(userToken.id);
  }
}

export default ResetPasswordService;
