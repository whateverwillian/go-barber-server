import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import {
  updateController,
  showProfile,
} from '../controllers/ProfileController';

const routes = Router();

routes.use(ensureAuthenticated);

routes.get('/', showProfile);
routes.put('/update', updateController);

export default routes;
