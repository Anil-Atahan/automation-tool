import { User } from './user.entity';
import { Result } from '../../../../shared/domain/result';

export interface UserRepository {
    findByEmail(email: string): Promise<Result<User>>;
    save(user: User): Promise<Result>;
}
  