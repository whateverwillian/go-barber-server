import ICacheProvider from '../models/ICacheProvider';

interface ICacheData {
  [key: string]: string;
}

class RedisCacheProvider implements ICacheProvider {
  private client: ICacheData = {};

  public async save(key: string, value: any): Promise<void> {
    this.client[key] = JSON.stringify(value);
  }

  public async recover<T>(key: string): Promise<T | null> {
    const data = this.client[key];

    if (!data) return null;

    return JSON.parse(data) as T;
  }

  public async invalidate(key: string): Promise<void> {
    delete this.client[key];
  }

  public async invalidatePrefix(prefix: string): Promise<void> {
    const keys = Object.keys(this.client).filter(key => key.startsWith(prefix));

    keys.forEach(key => delete this.client[key]);
  }
}

export default RedisCacheProvider;
