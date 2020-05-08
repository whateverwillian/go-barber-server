import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import UpdateUserAvatarService from './UpdateUserAvatarService';
import FakeUserRepository from '../repositories/fakes/FakeUserRepository';

describe('UpdateUserAvatar', () => {
  it('should be able to update user avatar', async () => {
    const userRepository = new FakeUserRepository();
    const storageProvider = new FakeStorageProvider();

    const UpdateUserAvatar = new UpdateUserAvatarService(
      userRepository,
      storageProvider,
    );

    const user = await userRepository.create({
      name: 'Willian',
      email: 'teste@gmail.com',
      password: 'test1234',
    });

    const updatedUser = await UpdateUserAvatar.execute({
      user_id: user.id,
      avatar_filename: 'avatar.jpg',
    });

    expect(updatedUser.avatar).toBe('avatar.jpg');
  });

  it('should not update avatar if user doesnt exist', async () => {
    const userRepository = new FakeUserRepository();
    const storageProvider = new FakeStorageProvider();

    const UpdateUserAvatar = new UpdateUserAvatarService(
      userRepository,
      storageProvider,
    );

    await expect(
      UpdateUserAvatar.execute({
        user_id: 'nobody',
        avatar_filename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when inserting new one', async () => {
    const userRepository = new FakeUserRepository();
    const storageProvider = new FakeStorageProvider();

    const user = await userRepository.create({
      name: 'Willian',
      email: 'teste@gmail.com',
      password: 'test1234',
    });

    const deleteFile = jest.spyOn(storageProvider, 'deleteFile');

    const UpdateUserAvatar = new UpdateUserAvatarService(
      userRepository,
      storageProvider,
    );

    await UpdateUserAvatar.execute({
      user_id: user.id,
      avatar_filename: 'avatar.jpg',
    });

    await UpdateUserAvatar.execute({
      user_id: user.id,
      avatar_filename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
  });
});
