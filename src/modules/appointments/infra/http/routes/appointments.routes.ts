import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import * as appointmentController from '../controllers/AppointmentController';

const routes = Router();

routes.use(ensureAuthenticated);

routes.post('/', appointmentController.create);

export default routes;
