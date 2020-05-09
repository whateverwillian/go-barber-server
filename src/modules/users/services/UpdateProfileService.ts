import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/userModel';
import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    user_id,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) throw new AppError('User not found');

    const emailAlreadyUsed = await this.userRepository.findByEmail(email);

    if (emailAlreadyUsed && emailAlreadyUsed.id !== user.id)
      throw new AppError('Email already used');

    user.name = name;
    user.email = email;

    if (password && !old_password)
      throw new AppError('Please provide a password', 401);

    if (password && old_password) {
      const passwordsAreEqual = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (passwordsAreEqual) {
        user.password = await this.hashProvider.generateHash(password);
      } else {
        throw new AppError('Password incorrect');
      }
    }

    return this.userRepository.save(user);
  }
}

export default UpdateProfileService;
