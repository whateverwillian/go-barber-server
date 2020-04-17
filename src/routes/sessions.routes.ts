import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const routes = Router();

routes.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const AuthenticateUser = new AuthenticateUserService();

    const { user, token } = await AuthenticateUser.execute({ email, password });

    response.json({ user, token });
  } catch (err) {
    response.status(400).json({ error: err.message });
  }
});

export default routes;
