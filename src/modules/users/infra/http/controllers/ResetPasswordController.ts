import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

async function ResetPasswordController(
  req: Request,
  res: Response,
): Promise<void> {
  const { password, token } = req.body;

  const ResetPassword = container.resolve(ResetPasswordService);

  await ResetPassword.execute({ password, token });

  res.status(204).send();
}

export default ResetPasswordController;
