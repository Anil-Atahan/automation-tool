import { Result } from '../../../../shared/domain/result';
import logger from '../../../../shared/infrastructure/logger/logger';
import { Role } from '../../domain/role/role.entity';
import { RoleRepository } from '../../domain/role/role.repository';
import RoleModel from '../models/role.model';
import { injectable } from 'inversify';

@injectable()
export class ORMRoleRepository implements RoleRepository {
    async findById(id: string) : Promise<Result<Role>> {
       const role = await RoleModel.findByPk(id);
       if (!role) return Result.fail('Role not found');
       return Result.ok(Role.fromPersistence(role.id, role.name, role.description, role.created_at, role.updated_at));
    }

    async save(role: Role) : Promise<Result<Role>> {
        const [instance, created] = await RoleModel.upsert({
            id: role.id,
            name: role.name,
            description: role.description,
            created_at: role.createdAt,
            updated_at: role.updatedAt
        });
        
        if (!instance){
            logger.error('Role upsert operation failed');
            return Result.fail('Role upsert operation failed');
        };

        logger.info(`Role ${created ? 'created' : 'updated'}`);

        return Result.ok(Role.fromPersistence(role.id, role.name, role.description, role.createdAt, role.updatedAt));
    }

    async findByName(name: string) : Promise<Result<Role>> {
        const role = await RoleModel.findOne({where: {name: name}});
        if (!role) return Result.fail('Role not found');
        return Result.ok(Role.fromPersistence(role.id, role.name, role.description, role.created_at, role.updated_at));
    }
}