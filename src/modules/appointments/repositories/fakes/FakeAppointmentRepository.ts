import { uuid } from 'uuidv4';
import { isEqual } from 'date-fns';

import { ICreateAppointmentDTO } from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { IAppointmentRepository } from '@modules/appointments/repositories/IAppointmentRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/appointmentModel';

class AppointmentRepository implements IAppointmentRepository {
  private appointments: Appointment[] = [];

  public async find(): Promise<Appointment[]> {
    return this.appointments;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = this.appointments.find(self =>
      isEqual(self.date, date),
    );

    return appointment;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const newAppointment = new Appointment();
    newAppointment.id = uuid();
    newAppointment.provider_id = provider_id;
    newAppointment.date = date;

    this.appointments.push(newAppointment);
    return newAppointment;
  }
}

export default AppointmentRepository;
