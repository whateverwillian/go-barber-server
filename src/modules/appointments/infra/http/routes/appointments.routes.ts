import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import * as appointmentController from '../controllers/AppointmentController';
import { providerAppointmentController } from '../controllers/ProviderAppointmentController';

const routes = Router();

routes.post(
  '/',
  ensureAuthenticated,
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date().required(),
    },
  }),
  appointmentController.create,
);
routes.get('/me', ensureAuthenticated, providerAppointmentController);

export default routes;
