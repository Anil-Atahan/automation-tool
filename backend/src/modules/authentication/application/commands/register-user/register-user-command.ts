import { Request } from '../../../../../shared/application/messaging/base-request';
import { Result } from '../../../../../shared/domain/result';

export class RegisterUserCommand implements Request<Result> {
    constructor(
      public readonly email: string,
      public readonly password: string,
      public readonly role: string = 'User' 
    ) {}
}
  