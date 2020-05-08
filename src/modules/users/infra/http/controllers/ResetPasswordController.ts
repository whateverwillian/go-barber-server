import { Request, Response, request } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

interface IRequest {
  req: Request;
  res: Response;
}

async function ResetPasswordController({ req, res }: IRequest): Promise<void> {
  const { password, token } = req.body;

  const ResetPassword = container.resolve(ResetPasswordService);

  await ResetPassword.execute({ password, token });

  res.status(204).send();
}

export default ResetPasswordController;
