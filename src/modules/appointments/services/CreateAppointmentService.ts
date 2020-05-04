import { startOfHour } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/appointmentModel';
import AppError from '@shared/errors/AppError';
import { IAppointmentRepository } from '../repositories/IAppointmentRepository';

interface IRequest {
  provider_id: string;
  date: Date;
}

class CreateAppointment {
  constructor(private appointmentRepository: IAppointmentRepository) {}

  public async execute({ provider_id, date }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentRepository.findOne(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const newAppointment = await this.appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return newAppointment;
  }
}

export default CreateAppointment;
