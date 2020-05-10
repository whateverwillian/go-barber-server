import { container } from 'tsyringe';
import { Request, Response } from 'express';

import ListProviders from '@modules/appointments/services/ListProvidersService';

export default async function ProviderController(
  request: Request,
  response: Response,
): Promise<Response> {
  const user_id = request.user.id;

  const listProvider = container.resolve(ListProviders);

  const providers = await listProvider.execute({ user_id });

  return response.json(providers);
}
