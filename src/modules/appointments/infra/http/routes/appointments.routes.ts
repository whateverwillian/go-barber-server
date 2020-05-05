import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';
import * as appointmentController from '../controllers/AppointmentController';

const routes = Router();

routes.use(ensureAuthenticated);

// routes.get('/', async (request, response) => {
//   const appointments = await appointmentRepository.find();

//   return response.json(appointments);
// });

routes.post('/', appointmentController.create);

export default routes;
