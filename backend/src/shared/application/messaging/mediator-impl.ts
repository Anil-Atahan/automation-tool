import { Mediator } from './mediator';
import { Request } from './base-request';
import { RequestHandler } from './request-handler';
import { getFromCache, setToCache } from '../../infrastructure/caching/cache'; 
import { CacheQuery } from './cache-query';
import globalContainer from '../../infrastructure/global-container';
import logger from '../../infrastructure/logger/logger';


export class MediatorImpl implements Mediator {
  async send<TRequest extends Request<TResponse>, TResponse>(
    request: TRequest,
  ): Promise<TResponse> {
    
    if ('cacheKey' in request) {
      const cacheQuery = request as CacheQuery<TResponse>;
      const cachedResponse = getFromCache<TResponse>(cacheQuery.cacheKey);
      if (cachedResponse) {
        logger.info(`Cache hit for key: ${cacheQuery.cacheKey}`);
        return cachedResponse;
      }

      logger.info(`Cache miss for key: ${cacheQuery.cacheKey}`);
      const handler = globalContainer.get<RequestHandler<TRequest, TResponse>>(
        request.constructor.name,
      );

      if (!handler) {
        throw new Error(`No handler registered for ${request.constructor.name}`);
      }

      const response = await handler.handle(request);

      setToCache(cacheQuery.cacheKey, response);

      return response;
    }

    const handler = globalContainer.get<RequestHandler<TRequest, TResponse>>(
      request.constructor.name,
    );

    if (!handler) {
      throw new Error(`No handler registered for ${request.constructor.name}`);
    }

    return handler.handle(request);
  }
}
