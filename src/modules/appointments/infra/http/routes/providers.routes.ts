import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import ProviderController from '../controllers/ProviderController';
import DayAvailabilityController from '../controllers/DayAvailabilityController';
import MonthAvailabilityController from '../controllers/MonthAvailabilityController';

const routes = Router();

const providerIdValidation = celebrate({
  [Segments.PARAMS]: {
    provider_id: Joi.string().uuid().required(),
  },
});

routes.get('/', ProviderController);
routes.get(
  '/:provider_id/day-availability',
  ensureAuthenticated,
  providerIdValidation,
  DayAvailabilityController,
);
routes.get(
  '/:provider_id/month-availability',
  ensureAuthenticated,
  providerIdValidation,
  MonthAvailabilityController,
);

export default routes;
