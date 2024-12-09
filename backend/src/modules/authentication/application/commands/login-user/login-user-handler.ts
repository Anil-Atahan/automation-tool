import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { injectable } from 'inversify';
import { UserRepository } from "../../../domain/user/user.repository";
import { LoginUserCommand } from "./login-user-command";
import globalContainer from '../../../../../shared/infrastructure/global-container';
import { Result } from "../../../../../shared/domain/result";
import { RequestHandler } from '../../../../../shared/application/messaging/request-handler';

@injectable()
export class LoginUserHandler implements RequestHandler<LoginUserCommand, Result<string>> {
  constructor(private readonly repository = globalContainer.get<UserRepository>('UserRepository')) {}

  async handle(command: LoginUserCommand): Promise<Result<string>> {
    const user = await this.repository.findByEmail(command.email);

    if (user.isFailure || !(await bcrypt.compare(command.password, user.value.passwordHash))) {
      return Result.fail("Invalid email or password");
    }

    return Result.ok(jwt.sign({ id: user.value.id }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRATION, algorithm: process.env.JWT_ALGORITHM as jwt.Algorithm }));
  }
}
