import { getRepository, Repository } from 'typeorm';

import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';

import User from '@modules/users/infra/typeorm/entities/userModel';

class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async create(credentials: ICreateUserDTO): Promise<User> {
    const newUser = this.ormRepository.create(credentials);

    await this.ormRepository.save(newUser);

    return newUser;
  }

  public async save(user: User): Promise<User> {
    this.ormRepository.save(user);
    return user;
  }
}

export default UsersRepository;
