import { uuid } from 'uuidv4';

import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import { ICreateUserDTO } from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import User from '@modules/users/infra/typeorm/entities/userModel';

class UsersRepository implements IUserRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(self => self.email === email);

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = this.users.find(self => self.id === id);

    return user;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const newUser = new User();

    newUser.id = uuid();
    newUser.name = name;
    newUser.email = email;
    newUser.password = password;

    this.users.push(newUser);
    return newUser;
  }

  public async save(user: User): Promise<User> {
    const userIdx = this.users.findIndex(self => self.id === user.id);

    this.users[userIdx] = { ...user };
    return this.users[userIdx];
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let providers: User[];
    if (except_user_id) {
      providers = this.users.filter(provider => provider.id !== except_user_id);
    } else {
      providers = this.users;
    }

    return providers;
  }
}

export default UsersRepository;
