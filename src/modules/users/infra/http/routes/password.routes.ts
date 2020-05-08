import { Router } from 'express';

import ResetPasswordController from '../controllers/ResetPasswordController';
import ForgotPasswordController from '../controllers/ForgotPasswordController';

const routes = Router();

routes.post('/reset', ResetPasswordController);
routes.post('/forgot', ForgotPasswordController);

export default routes;
