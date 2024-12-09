import { Result } from "../../../../shared/domain/result";
import { RolePermission } from "./role-permission.entity";

export interface RolePermissionRepository {
    findByRoleId(roleId: string): Promise<Result<RolePermission[]>>;
    save(rolePermission: RolePermission): Promise<Result<RolePermission>>;
}