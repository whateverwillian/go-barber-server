import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export async function update(
  request: Request,
  response: Response,
): Promise<Response> {
  const UpdateUserAvatar = container.resolve(UpdateUserAvatarService);

  await UpdateUserAvatar.execute({
    user_id: request.user.id,
    avatar_filename: request.file.filename,
  });

  return response.status(204).send();
}
