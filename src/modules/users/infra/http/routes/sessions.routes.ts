import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const routes = Router();
const userRepository = new UserRepository();

routes.post('/', async (request, response) => {
  const { email, password } = request.body;

  const AuthenticateUser = new AuthenticateUserService(userRepository);

  const { user, token } = await AuthenticateUser.execute({ email, password });

  response.json({ user, token });
});

export default routes;
