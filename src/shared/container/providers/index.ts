import { container } from 'tsyringe';

import IStorageProvider from './StorageProvider/models/IStorageProvider';
import StorageProvider from './StorageProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  StorageProvider,
);
