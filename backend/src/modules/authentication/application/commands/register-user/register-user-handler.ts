import { RegisterUserCommand } from "./register-user-command";
import { UserRepository } from "../../../domain/user/user.repository";
import bcrypt from "bcrypt";
import globalContainer from '../../../../../shared/infrastructure/global-container';
import { Result } from "../../../../../shared/domain/result";
import { RequestHandler } from '../../../../../shared/application/messaging/request-handler';
import { User } from "../../../domain/user/user.entity";
import { RoleRepository } from "../../../domain/role/role.repository";

export class RegisterUserHandler implements RequestHandler<RegisterUserCommand, Result> {
  constructor(private readonly repository = globalContainer.get<UserRepository>('UserRepository'),
  private readonly roleRepository = globalContainer.get<RoleRepository>('RoleRepository')) {}

  async handle(command: RegisterUserCommand) : Promise<Result> {
    const userExists = await this.repository.findByEmail(command.email);

    if (userExists.isSuccess) {
      return Result.fail("User already exists");
    }

    const hashedPassword = await bcrypt.hash(command.password, 10);

    var role = await this.roleRepository.findByName(command.role);

    if (role.isFailure) {
      return Result.fail("Role not found");
    }

    const user = User.create(
      command.email,
      hashedPassword,
      role.value.id
      );

    const createdUser = await this.repository.save(user);

    if (createdUser.isFailure) {
      return Result.fail("Failed to create user");
    }

    return Result.ok();
  }
}
