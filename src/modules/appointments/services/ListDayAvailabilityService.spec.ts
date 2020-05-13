import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListDayAvailabilityService from './ListDayAvailabilityService';

let listDayAvailability: ListDayAvailabilityService;
let fakeAppointmentRepository: FakeAppointmentRepository;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listDayAvailability = new ListDayAvailabilityService(
      fakeAppointmentRepository,
    );
  });

  it('should be able to list providers', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'example',
      user_id: 'example',
      date: new Date(2020, 4, 20, 8),
    });

    await fakeAppointmentRepository.create({
      provider_id: 'example',
      user_id: 'example',
      date: new Date(2020, 4, 20, 14),
    });

    const availability = await listDayAvailability.execute({
      provider_id: 'example',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, available: false },
        { hour: 10, available: true },
        { hour: 11, available: true },
        { hour: 12, available: true },
        { hour: 13, available: true },
        { hour: 14, available: false },
      ]),
    );
  });
});
