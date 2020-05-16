import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ResetPasswordController from '../controllers/ResetPasswordController';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const routes = Router();

routes.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      token: Joi.string().uuid().required(),
      password: Joi.string().required(),
      passwordConfirm: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  ResetPasswordController,
);

routes.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  ForgotPasswordController,
);

export default routes;
