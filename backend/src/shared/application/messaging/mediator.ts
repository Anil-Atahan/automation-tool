import { Request } from './base-request';

export interface Mediator {
  send<TRequest extends Request<TResponse>, TResponse>(request: TRequest): Promise<TResponse>;
}
