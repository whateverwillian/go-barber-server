import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import * as userController from '../controllers/userController';
import * as avatarController from '../controllers/userAvatarController';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/', userController.create);

routes.use(ensureAuthenticated);

routes.patch('/avatar', upload.single('avatar'), avatarController.update);

export default routes;
