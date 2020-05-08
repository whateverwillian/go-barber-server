import UserToken from '../infra/typeorm/entities/userToken';

export default interface IUserTokenRepository {
  generate(user_id: string): Promise<UserToken>;
}
