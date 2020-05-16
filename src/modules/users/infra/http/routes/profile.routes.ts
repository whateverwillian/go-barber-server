import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import {
  updateController,
  showProfile,
} from '../controllers/ProfileController';

const routes = Router();

routes.get('/', showProfile);
routes.put(
  '/update',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string(),
      passwordConfirm: Joi.string().valid(Joi.ref('password')),
    },
  }),
  updateController,
);

export default routes;
