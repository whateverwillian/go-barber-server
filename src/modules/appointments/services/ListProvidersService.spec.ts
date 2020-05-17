import FakeRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import CacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import ListProvidersService from './ListProvidersService';

let fakeRepository: FakeRepository;
let listProvider: ListProvidersService;
let cacheProvider: CacheProvider;

describe('ListProviders', () => {
  beforeEach(() => {
    cacheProvider = new CacheProvider();
    fakeRepository = new FakeRepository();
    listProvider = new ListProvidersService(fakeRepository, cacheProvider);
  });

  it('should be able to list providers', async () => {
    const user1 = await fakeRepository.create({
      name: 'Karina',
      email: 'teste@gmail.com',
      password: 'test1234',
    });

    const user2 = await fakeRepository.create({
      name: 'João',
      email: 'teste@gmail.com',
      password: 'test1234',
    });

    const loggedUser = await fakeRepository.create({
      name: 'Willian',
      email: 'teste@gmail.com',
      password: 'test1234',
    });

    const providers = await listProvider.execute({ user_id: loggedUser.id });
    expect(providers).toEqual([user1, user2]);
  });
});
