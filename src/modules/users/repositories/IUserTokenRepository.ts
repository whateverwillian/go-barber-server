import UserToken from '../infra/typeorm/entities/userToken';

export default interface IUserTokenRepository {
  generate(user_id: string): Promise<UserToken>;
  findByToken(token: string): Promise<UserToken | undefined>;
  delete(token_id: string): Promise<void>;
}
