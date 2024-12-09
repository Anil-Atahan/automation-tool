import { User } from "../../domain/user/user.entity";
import { injectable } from 'inversify';
import { UserRepository } from "../../domain/user/user.repository";
import { Result } from "../../../../shared/domain/result";
import UserModel from "../models/user.model";
import logger from "../../../../shared/infrastructure/logger/logger";

@injectable()
export class ORMUserRepository implements UserRepository {
  async findByEmail(email: string): Promise<Result<User>> {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) return Result.fail('User not found');

    return Result.ok(User.fromPersistence(user.id, user.email, user.password_hash, 
      user.role_id, user.created_at, user.updated_at));
  }

  async save(user: User): Promise<Result> {
    const [instance, created] = await UserModel.upsert({
        id: user.id,
        email: user.email,
        password_hash: user.passwordHash,
        role_id: user.roleId,
        created_at: user.createdAt,
        updated_at: user.updatedAt
    });

    if (!instance) {
      logger.error('User upsert operation failed');
      return Result.fail('User upsert operation failed');
    }
    
    logger.info(`User ${created ? 'created' : 'updated'}`);

    return Result.ok();
  }
}
