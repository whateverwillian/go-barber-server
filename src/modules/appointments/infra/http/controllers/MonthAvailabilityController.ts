import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListMonthAvailability from '@modules/appointments/services/ListMonthAvailability';

export default async function MonthAvailabilityController(
  request: Request,
  response: Response,
): Promise<Response> {
  const { provider_id } = request.params;
  const { month, year } = request.query;

  const listMonthAvailability = container.resolve(ListMonthAvailability);

  const availability = await listMonthAvailability.execute({
    provider_id,
    month: Number(month),
    year: Number(year),
  });

  return response.json(availability);
}
