import { container } from 'tsyringe';

import '../../modules/users/providers/index';
import './providers';

import { IAppointmentRepository } from '@modules/appointments/repositories/IAppointmentRepository';
import AppointmentRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentRepository';

import { IUserRepository } from '@modules/users/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';

container.registerSingleton<IAppointmentRepository>(
  'AppointmentRepository',
  AppointmentRepository,
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUserTokenRepository>(
  'TokenRepository',
  UserTokenRepository,
);
