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
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    const appointment = await CreateAppointment.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: '123123',
      user_id: 'whatever',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('should not be able to create two appointments on same date', async () => {
    const sameDate = new Date(2020, 4, 10, 13);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await CreateAppointment.execute({
      date: sameDate,
      provider_id: '123123',
      user_id: 'whatever',
    });

    await expect(
      CreateAppointment.execute({
        date: sameDate,
        provider_id: '123123',
        user_id: 'whatever',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment on a passed date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      CreateAppointment.execute({
        date: new Date(2020, 4, 10, 11),
        provider_id: '123123',
        user_id: 'whatever',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with yourself', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      CreateAppointment.execute({
        date: new Date(2020, 4, 10, 13),
        provider_id: '123123',
        user_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment outside available hours', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    });

    await expect(
      CreateAppointment.execute({
        date: new Date(2020, 4, 11, 7),
        provider_id: '123123',
        user_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      CreateAppointment.execute({
        date: new Date(2020, 4, 11, 18),
        provider_id: '123123',
        user_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
