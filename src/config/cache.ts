import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: string;

  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: 'redis',

  config: {
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASS || 'senha',
    },
  },
} as ICacheConfig;