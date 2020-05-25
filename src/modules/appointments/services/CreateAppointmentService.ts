import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';

import Appointment from '@modules/appointments/infra/typeorm/entities/appointmentModel';
import AppError from '@shared/errors/AppError';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { IAppointmentRepository } from '../repositories/IAppointmentRepository';

interface IRequest {
  provider_id: string;
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointment {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,

    @inject('NotificationRepository')
    private notificationRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    user_id,
    date,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now()))
      throw new AppError('You cant create an appointment on a passed date');

    if (user_id === provider_id)
      throw new AppError('You cant create an appointment with yourself');

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17)
      throw new AppError(
        'You can only create appointments between 8am and 5pm',
      );

    const findAppointmentInSameDate = await this.appointmentRepository.findByDate(
      appointmentDate,
      provider_id,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const newAppointment = await this.appointmentRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    const dateThatNormalHumansUse = format(
      appointmentDate,
      "dd/MM/yyyy 'às' HH:mm'h'",
    );

    await this.notificationRepository.create({
      content: `Um novo agendamento foi marcado para ${dateThatNormalHumansUse}`,
      user_id: provider_id,
    });

    const cacheKey = `appointments-day:${provider_id}:${format(
      appointmentDate,
      'yyyy-M-d',
    )}`;

    await this.cacheProvider.invalidate(cacheKey);

    return newAppointment;
  }
}

export default CreateAppointment;
