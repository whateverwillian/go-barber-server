import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import ProviderController from '../controllers/ProviderController';

const routes = Router();

routes.use(ensureAuthenticated);

routes.get('/', ProviderController);

export default routes;
