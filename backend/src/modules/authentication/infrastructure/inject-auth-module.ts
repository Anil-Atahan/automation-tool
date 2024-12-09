import { RequestHandler } from '../../../shared/application/messaging/request-handler';
import { Result } from '../../../shared/domain/result';
import globalContainer from '../../../shared/infrastructure/global-container';
import { LoginUserCommand } from '../application/commands/login-user/login-user-command';
import { LoginUserHandler } from '../application/commands/login-user/login-user-handler';
import { RegisterUserCommand } from '../application/commands/register-user/register-user-command';
import { RegisterUserHandler } from '../application/commands/register-user/register-user-handler';
import { PermissionRepository } from '../domain/permission/permission.repository';
import { RolePermissionRepository } from '../domain/role-permission/role-permission.repository';
import { RoleRepository } from '../domain/role/role.repository';
import { UserRepository } from '../domain/user/user.repository';
import { ORMPermissionRepository } from './repositories/permission.orm-repository';
import { ORMRolePermissionRepository } from './repositories/role-permission.orm-repository';
import { ORMRoleRepository } from './repositories/role.orm-repository';
import { ORMUserRepository } from './repositories/user.orm-repository';


export const injectAuthModule = () => {
  globalContainer.bind<UserRepository>('UserRepository').to(ORMUserRepository);
  globalContainer.bind<RoleRepository>('RoleRepository').to(ORMRoleRepository);
  globalContainer.bind<PermissionRepository>('PermissionRepository').to(ORMPermissionRepository);
  globalContainer.bind<RolePermissionRepository>('RolePermissionRepository').to(ORMRolePermissionRepository);

  globalContainer.bind<RequestHandler<LoginUserCommand, Result<string>>>('LoginUserCommand')
  .to(LoginUserHandler).inTransientScope();
  globalContainer.bind<RequestHandler<RegisterUserCommand, Result>>('RegisterUserCommand')
  .to(RegisterUserHandler).inTransientScope();
}