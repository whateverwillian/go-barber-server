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
    // All the available hours in a day
    await fakeAppointmentRepository.create({
      provider_id: 'example',
      user_id: 'user',
      date: new Date(2020, 4, 20, 8, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'example',
      user_id: 'user',
      date: new Date(2020, 4, 20, 9, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'example',
      user_id: 'user',
      date: new Date(2020, 4, 20, 10, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'example',
      user_id: 'user',
      date: new Date(2020, 4, 20, 11, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'example',
      user_id: 'user',
      date: new Date(2020, 4, 20, 12, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'example',
      user_id: 'user',
      date: new Date(2020, 4, 20, 13, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'example',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'example',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'example',
      user_id: 'user',
      date: new Date(2020, 4, 20, 16, 0, 0),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'example',
      user_id: 'user',
      date: new Date(2020, 4, 20, 17, 0, 0),
    });

    // Other day
    await fakeAppointmentRepository.create({
      provider_id: 'example',
      user_id: 'user',
      date: new Date(2020, 4, 21, 8, 0, 0),
    });

    // Exception
    await fakeAppointmentRepository.create({
      provider_id: 'example',
      user_id: 'user',
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
        { day: 21, available: true },
        { day: 22, available: true },
      ]),
    );
  });
});
