import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ForgotPasswordService from '@modules/users/services/ForgotPasswordService';

async function ForgotController(req: Request, res: Response): Promise<void> {
  const { email } = req.body;

  const forgotPasswordService = container.resolve(ForgotPasswordService);

  await forgotPasswordService.execute({ email });

  res.status(200).json({ status: 'success', message: 'Check your E-mail' });
}

export default ForgotController;
