import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import * as appointmentController from '../controllers/AppointmentController';
import { providerAppointmentController } from '../controllers/ProviderAppointmentController';

const routes = Router();

routes.use(ensureAuthenticated);

routes.post('/', appointmentController.create);
routes.post('/me', providerAppointmentController);

export default routes;
