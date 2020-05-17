import CacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProviderAppointmentsService from './ListProviderAppointmentsService';

let listProviderAppointments: ListProviderAppointmentsService;
let fakeAppointmentRepository: FakeAppointmentRepository;
let cacheProvider: CacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    cacheProvider = new CacheProvider();
    fakeAppointmentRepository = new FakeAppointmentRepository();
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentRepository,
      cacheProvider,
    );
  });

  it('should be able to list the appointments of the day', async () => {
    const appointment1 = await fakeAppointmentRepository.create({
      provider_id: 'example',
      user_id: 'example',
      date: new Date(2020, 4, 20, 8),
    });

    const appointment2 = await fakeAppointmentRepository.create({
      provider_id: 'example',
      user_id: 'example',
      date: new Date(2020, 4, 20, 14),
    });

    const appointments = await listProviderAppointments.execute({
      provider_id: 'example',
      day: 20,
      month: 5,
      year: 2020,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
