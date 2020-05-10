import AppError from '@shared/errors/AppError';

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListMonthAvailability from './ListMonthAvailability';

let listMonthAvailability: ListMonthAvailability;
let fakeAppointmentRepository: FakeAppointmentRepository;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listMonthAvailability = new ListMonthAvailability(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list providers', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'example',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'example',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'example',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'example',
      date: new Date(2020, 2, 20, 10, 0, 0),
    });

    const availability = await listMonthAvailability.execute({
      provider_id: 'example',
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { day: 19, available: true },
        { day: 20, available: false },
        { day: 21, available: false },
        { day: 22, available: true },
      ]),
    );
  });
});
