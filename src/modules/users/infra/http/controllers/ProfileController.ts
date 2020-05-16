import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export async function updateController(
  req: Request,
  res: Response,
): Promise<void> {
  const { name, email, password, old_password } = req.body;
  const user_id = req.user.id;

  const updateProfile = container.resolve(UpdateProfileService);

  const user = await updateProfile.execute({
    user_id,
    name,
    email,
    old_password,
    password,
  });

  res.status(200).json(classToClass(user));
}

export async function showProfile(req: Request, res: Response): Promise<void> {
  const user_id = req.user.id;

  const ShowProfile = container.resolve(ShowProfileService);

  const user = await ShowProfile.execute({
    user_id,
  });

  delete user.password;

  res.json(user);
}
