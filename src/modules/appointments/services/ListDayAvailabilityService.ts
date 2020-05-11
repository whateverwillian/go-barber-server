import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import { IAppointmentRepository } from '../repositories/IAppointmentRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListDayAvailability {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute(data: IRequest): Promise<IResponse> {
    const appointmentsInDay = await this.appointmentRepository.findAllInDayFromProvider(
      data,
    );

    const startHour = 8;

    const eachHourArray = Array.from(
      { length: 10 },
      (value, index) => index + startHour,
    );

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointmentsInDay.find(appointment => {
        return getHours(appointment.date) === hour;
      });

      const now = new Date(Date.now());
      const appointmentHour = new Date(
        data.year,
        data.month - 1,
        data.day,
        hour,
      );

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(appointmentHour, now),
      };
    });

    return availability;
  }
}

export default ListDayAvailability;
