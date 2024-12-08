import { Query } from './query';

export interface CacheQuery<TResponse> extends Query<TResponse> {
  cacheKey: string; 
}
