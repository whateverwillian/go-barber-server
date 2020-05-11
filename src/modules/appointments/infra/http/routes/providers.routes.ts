import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import ProviderController from '../controllers/ProviderController';
import DayAvailabilityController from '../controllers/DayAvailabilityController';
import MonthAvailabilityController from '../controllers/MonthAvailabilityController';

const routes = Router();

routes.use(ensureAuthenticated);

routes.get('/', ProviderController);
routes.get('/:provider_id/day-availability', DayAvailabilityController);
routes.get('/:provider_id/month-availability', MonthAvailabilityController);

export default routes;
