import { Request } from '../../../../../shared/application/messaging/base-request';
import { Result } from '../../../../../shared/domain/result';

export class LoginUserCommand implements Request<Result<string>> {
    constructor(public readonly email: string, public readonly password: string) {}
}
  