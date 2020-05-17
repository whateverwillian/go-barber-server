import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/userModel';
import AppError from '@shared/errors/AppError';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkEmail = await this.usersRepository.findByEmail(email);

    if (checkEmail) throw new AppError('Email already used.');

    const hashedPassword = await this.hashProvider.generateHash(password);

    const newUser = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await this.cacheProvider.invalidatePrefix('providers-list');

    return newUser;
  }
}

export default CreateUserService;
