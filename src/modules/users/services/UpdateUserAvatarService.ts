import fs from 'fs';
import path from 'path';
import { injectable, inject } from 'tsyringe';

import User from '@modules/users/infra/typeorm/entities/userModel';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import { IUserRepository } from '@modules/users/repositories/IUserRepository';

interface IRequest {
  user_id: string;
  avatar_filename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ user_id, avatar_filename }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatar_filename;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
