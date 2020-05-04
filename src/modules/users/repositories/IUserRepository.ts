import User from '@modules/users/infra/typeorm/entities/userModel';

import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

export interface IUserRepository {
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
