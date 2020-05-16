import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import * as userController from '../controllers/userController';
import * as avatarController from '../controllers/userAvatarController';

const routes = Router();
const upload = multer(uploadConfig);

routes.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      passwordConfirm: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  userController.create,
);

routes.patch(
  '/avatar',
  upload.single('avatar'),
  ensureAuthenticated,
  avatarController.update,
);

export default routes;
