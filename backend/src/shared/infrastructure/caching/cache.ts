import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 180 });

export const getFromCache = <T>(key: string): T | null => {
  const value = cache.get<T>(key);
  return value || null;
};

export const setToCache = <T>(key: string, value: T): void => {
  cache.set(key, value);
};

export const deleteFromCache = (prefix: string): void => {
  const keys = cache.keys();
  keys.forEach(key => {
    if (key.startsWith(prefix + '-')) {
      cache.del(key);
    }
  });
};

export const clearCache = (): void => {
  cache.flushAll();
};
