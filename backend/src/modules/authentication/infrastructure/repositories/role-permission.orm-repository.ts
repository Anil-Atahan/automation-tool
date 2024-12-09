import { injectable } from "inversify";
import { RolePermissionRepository } from "../../domain/role-permission/role-permission.repository";
import logger from "../../../../shared/infrastructure/logger/logger";
import { Result } from "../../../../shared/domain/result";
import { RolePermission } from "../../domain/role-permission/role-permission.entity";
import RolePermissionModel from "../models/role-permission.model";

@injectable()
export class ORMRolePermissionRepository implements RolePermissionRepository {
    async save(rolePermission: RolePermission) : Promise<Result<RolePermission>> {
        const [instance, created] = await RolePermissionModel.upsert({
            role_id: rolePermission.roleId,
            permission_id: rolePermission.permissionId
        });
        
        if (!instance){
            logger.error('Role permission upsert operation failed');
            return Result.fail('Role permission upsert operation failed');
        };

        logger.info(`Role permission ${created ? 'created' : 'updated'}`);

        return Result.ok(RolePermission.fromPersistence(rolePermission.roleId, rolePermission.permissionId));
    }

    async findByRoleId(roleId: string): Promise<Result<RolePermission[]>> {
        const rolePermissions = await RolePermissionModel.findAll({ where: { role_id: roleId } });
        const result = rolePermissions.map(rp => RolePermission.fromPersistence(rp.role_id, rp.permission_id));
        return Result.ok(result);
    }
}