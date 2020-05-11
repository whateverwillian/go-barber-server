import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListDayAvailabilityService from '@modules/appointments/services/ListDayAvailabilityService';

export default async function DayhAvailabilityController(
  request: Request,
  response: Response,
): Promise<Response> {
  const { provider_id } = request.params;
  const { month, year, day } = request.body;

  const listDayAvailabilityService = container.resolve(
    ListDayAvailabilityService,
  );

  const availability = await listDayAvailabilityService.execute({
    provider_id,
    month,
    year,
    day,
  });

  return response.json(availability);
}
