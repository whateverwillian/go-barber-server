import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import * as sessionController from '../controllers/sessionController';

const routes = Router();

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);

export default routes;
