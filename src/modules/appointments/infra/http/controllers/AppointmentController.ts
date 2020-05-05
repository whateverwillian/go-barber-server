import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

import CreateAppointment from '@modules/appointments/services/CreateAppointmentService';

export async function create(
  request: Request,
  response: Response,
): Promise<Response> {
  const { provider_id, date } = request.body;

  const parsedDate = parseISO(date);

  const createAppointment = container.resolve(CreateAppointment);

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDate,
  });

  return response.json(appointment);
}