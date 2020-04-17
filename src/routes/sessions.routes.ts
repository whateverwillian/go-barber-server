import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const routes = Router();

routes.post('/', async (request, response) => {
  const { email, password } = request.body;

  const AuthenticateUser = new AuthenticateUserService();

  const { user, token } = await AuthenticateUser.execute({ email, password });

  response.json({ user, token });
});

export default routes;
