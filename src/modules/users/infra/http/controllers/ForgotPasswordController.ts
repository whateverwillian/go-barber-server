import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ForgotPasswordService from '@modules/users/services/ForgotPasswordService';

interface IRequest {
  req: Request;
  res: Response;
}

async function ForgotPasswordController(
  req: Request,
  res: Response,
): Promise<void> {
  const { email } = req.body;

  const forgotPasswordService = container.resolve(ForgotPasswordService);

  await forgotPasswordService.execute({ email });

  res.status(204).send();
}

export default ForgotPasswordController;
