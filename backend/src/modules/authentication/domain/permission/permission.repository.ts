import { Result } from "../../../../shared/domain/result";
import { Permission } from "./permission.entity";

export interface PermissionRepository {
    findByRoleId(roleId: string): Promise<Result<Permission[]>>;
    save(permission: Permission): Promise<Result>;
    findByName(name: string): Promise<Result<Permission>>;
    findAll(): Promise<Result<Permission[]>>;
}