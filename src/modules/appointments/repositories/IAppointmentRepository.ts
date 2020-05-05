import Appointment from '@modules/appointments/infra/typeorm/entities/appointmentModel';

import { ICreateAppointmentDTO } from '@modules/appointments/dtos/ICreateAppointmentDTO';

export interface IAppointmentRepository {
  find(): Promise<Appointment[]>;
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
