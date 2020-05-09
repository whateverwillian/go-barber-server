import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

async function ResetController(req: Request, res: Response): Promise<void> {
  const { password, token } = req.body;

  const ResetPassword = container.resolve(ResetPasswordService);

  await ResetPassword.execute({ password, token });

  res.status(200).json({ status: 'success', message: 'Password updated' });
}

export default ResetController;
