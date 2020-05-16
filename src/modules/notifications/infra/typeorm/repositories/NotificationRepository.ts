import { getMongoRepository, MongoRepository } from 'typeorm';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';
import INotificationsRepository from '../../../repositories/INotificationsRepository';
import ICreateNotificationDTO from '../../../dtos/ICreateNotificationDTO';

class NotificationRepository implements INotificationsRepository {
  ormRepository: MongoRepository<Notification>;

  constructor() {
    this.ormRepository = getMongoRepository(Notification, 'mongo');
  }

  public async create({
    content,
    user_id,
  }: ICreateNotificationDTO): Promise<Notification> {
    const notification = this.ormRepository.create({
      content,
      user_id,
    });

    await this.ormRepository.save(notification);

    return notification;
  }
}

export default NotificationRepository;
