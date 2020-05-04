import { Router } from 'express';

import AppointmentsRouter from '@modules/appointments/infra/http/routes/appointments.routes';
import UsersRouter from '@modules/users/infra/http/routes//users.routes';
import SessionsRouter from '@modules/users/infra/http/routes//sessions.routes';

const routes = Router();

routes.use('/appointments', AppointmentsRouter);
routes.use('/users', UsersRouter);
routes.use('/sessions', SessionsRouter);

export default routes;
