import User from '@modules/users/infra/typeorm/entities/userModel';

import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

export interface IUserRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
