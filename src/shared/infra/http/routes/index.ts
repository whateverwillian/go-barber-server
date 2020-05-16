import { Router } from 'express';

import AppointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import UsersRouter from '@modules/users/infra/http/routes/users.routes';
import SessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import PasswordRouter from '@modules/users/infra/http/routes/password.routes';
import ProfileRouter from '@modules/users/infra/http/routes/profile.routes';
import ProviderRouter from '@modules/appointments/infra/http/routes/providers.routes';

const routes = Router();

routes.use('/password', PasswordRouter);
routes.use('/appointments', AppointmentsRouter);
routes.use('/users', UsersRouter);
routes.use('/sessions', SessionsRouter);
routes.use('/profile', ProfileRouter);
routes.use('/providers', ProviderRouter);

export default routes;
