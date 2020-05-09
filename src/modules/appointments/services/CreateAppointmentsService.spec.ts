import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentRepository: FakeAppointmentRepository;
let CreateAppointment: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository();
    CreateAppointment = new CreateAppointmentService(fakeAppointmentRepository);
  });

  it('should be able do create an appointment', async () => {
    const appointment = await CreateAppointment.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create two appointments on same date', async () => {
    const sameDate = new Date();

    await CreateAppointment.execute({
      date: sameDate,
      provider_id: '123123',
    });

    expect(
      CreateAppointment.execute({
        date: sameDate,
        provider_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
