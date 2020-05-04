import { Router } from 'express';
import { parseISO } from 'date-fns';

import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';
import CreateAppointment from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

const routes = Router();
const appointmentRepository = new AppointmentRepository();

routes.use(ensureAuthenticated);

routes.get('/', async (request, response) => {
  const appointments = await appointmentRepository.find();

  return response.json(appointments);
});

routes.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);
  const createAppointment = new CreateAppointment(appointmentRepository);

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
});

export default routes;
