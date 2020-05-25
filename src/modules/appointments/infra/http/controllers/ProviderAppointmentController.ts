import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProviderAppointments from '@modules/appointments/services/ListProviderAppointmentsService';

export async function providerAppointmentController(
  request: Request,
  response: Response,
): Promise<Response> {
  const { day, month, year } = request.query;
  const provider_id = request.user.id;

  const listProviderAppointments = container.resolve(ListProviderAppointments);

  const appointments = await listProviderAppointments.execute({
    provider_id,
    day: Number(day),
    month: Number(month),
    year: Number(year),
  });

  return response.json(appointments);
}
