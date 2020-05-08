import { uuid } from 'uuidv4';

import IUserTokenRepository from '../IUserTokenRepository';
import UserToken from '../../infra/typeorm/entities/userToken';

class FakeUserTokenRepository implements IUserTokenRepository {
  private tokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const token = new UserToken();

    token.id = uuid();
    token.token = uuid();
    token.user_id = user_id;
    token.created_at = new Date();
    token.updated_at = new Date();

    this.tokens.push(token);
    return token;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.tokens.find(self => self.token === token);

    return userToken;
  }
}

export default FakeUserTokenRepository;
