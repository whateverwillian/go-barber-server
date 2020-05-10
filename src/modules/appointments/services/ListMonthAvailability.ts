import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import { IAppointmentRepository } from '../repositories/IAppointmentRepository';
import AppointmentRepository from '../infra/typeorm/repositories/AppointmentRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListMonthAvailability {
  constructor(
    @inject('AppointmentRepository')
    private appointmentRepository: IAppointmentRepository,
  ) {}

  public async execute({
    provider_id,
    month,
    year,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentRepository.findAllInMonthFromProvider(
      {
        provider_id,
        month,
        year,
      },
    );

    console.log(appointments);

    return [{ day: 1, available: true }];
  }
}

export default ListMonthAvailability;
