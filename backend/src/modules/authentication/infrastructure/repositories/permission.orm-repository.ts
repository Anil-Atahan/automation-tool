import { Result } from "../../../../shared/domain/result";
import logger from "../../../../shared/infrastructure/logger/logger";
import { Permission } from "../../domain/permission/permission.entity";
import { PermissionRepository } from "../../domain/permission/permission.repository";
import PermissionModel from "../models/permission.model";
import { injectable } from 'inversify';

@injectable()
export class ORMPermissionRepository implements PermissionRepository {
    async findByRoleId(roleId : string) : Promise<Result<Permission[]>>{
        const permission = await PermissionModel.findAll({where: {role_id: roleId}});
        if (!permission)
            return Result.fail('Permission not found');
        
        return Result.ok(permission.map(p => Permission.fromPersistence(p.id, p.name, p.description, p.created_at, p.updated_at)));
    }

    async save(permission: Permission) : Promise<Result>{
        const [instance, created] = await PermissionModel.upsert({
            id: permission.id,
            name: permission.name,
            description: permission.description,
            created_at: permission.createdAt,
            updated_at: permission.updatedAt
        });

        if (!instance)
        {
            logger.error('Permission upsert operation failed');
            return Result.fail('Permission upsert operation failed');
        }

        logger.info(`Permission ${created ? 'created' : 'updated'}`);

        return Result.ok();
    }

    async findByName(name: string) : Promise<Result<Permission>>{
        const permission = await PermissionModel.findOne({where: {name}});
        if (!permission)
            return Result.fail('Permission not found');
        
        return Result.ok(Permission.fromPersistence(permission.id, permission.name, permission.description, permission.created_at, permission.updated_at));
    }

    async findAll() : Promise<Result<Permission[]>>{
        const permissions = await PermissionModel.findAll();
        return Result.ok(permissions.map(p => Permission.fromPersistence(p.id, p.name, p.description, p.created_at, p.updated_at)));
    }
}