import { RoleRepository } from "../../domain/role/role.repository";
import { PermissionRepository } from "../../domain/permission/permission.repository";
import globalContainer from "../../../../shared/infrastructure/global-container";
import { RolePermission } from "../../domain/role-permission/role-permission.entity";
import { Role } from "../../domain/role/role.entity";
import { Permission } from "../../domain/permission/permission.entity";
import { RolePermissionRepository } from "../../domain/role-permission/role-permission.repository";
import { RoleName } from "../../../../shared/infrastructure/auth/role-name";
import { PermissionName } from "../../../../shared/infrastructure/auth/permission-name";

export async function seedRolesAndPermissions() {
  const roleRepository = globalContainer.get<RoleRepository>("RoleRepository");
  const permissionRepository = globalContainer.get<PermissionRepository>("PermissionRepository");
  const rolePermissionRepository = globalContainer.get<RolePermissionRepository>("RolePermissionRepository");

  const permissions = [
    { name: PermissionName.CREATE_USER, description: "Create a new user" },
    { name: PermissionName.VIEW_DASHBOARD, description: "View the admin dashboard" },
    { name: PermissionName.MANAGE_AUTOMATIONS, description: "Manage automations" }
  ];

  for (const permission of permissions) {
    var existingPermission = await permissionRepository.findByName(permission.name);
    if (existingPermission.isFailure) {
      await permissionRepository.save(Permission.create(permission.name, permission.description));
    }
  }

  const roles = [
    { name: RoleName.ADMIN, description: "Administrator with full access" },
    { name: RoleName.USER, description: "Standard user" },
  ];

  for (const role of roles) {
    var existingRole = await roleRepository.findByName(role.name);
    if (existingRole.isFailure) {
      const createdRole = await roleRepository.save(Role.create(role.name, role.description));

      if (createdRole.value.name === RoleName.ADMIN) {
        const allPermissions = await permissionRepository.findAll();
        for (const permission of allPermissions.value) {
          await rolePermissionRepository.save(RolePermission.create(createdRole.value.id, permission.id));
        }
      }
    }
  }
}
