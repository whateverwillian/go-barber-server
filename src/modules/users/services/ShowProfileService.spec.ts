import AppError from '@shared/errors/AppError';

import FakeUserRepository from '../repositories/fakes/FakeUserRepository';
import ShowProfileService from './ShowProfileService';

let fakeUserRepository: FakeUserRepository;
let showProfile: ShowProfileService;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    showProfile = new ShowProfileService(fakeUserRepository);
  });

  it('should be able to show user profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'teste',
      email: 'teste@gmail.com',
      password: 'test1234',
    });

    const profile = await showProfile.execute({ user_id: user.id });

    expect(profile.name).toBe('teste');
    expect(profile.email).toBe('teste@gmail.com');
  });

  it('should not be able to show user profile that doesnt exists', async () => {
    await expect(
      showProfile.execute({ user_id: 'non-exist' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
