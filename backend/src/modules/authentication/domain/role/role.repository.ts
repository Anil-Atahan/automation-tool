import { Result } from "../../../../shared/domain/result";
import { Role } from "./role.entity";

export interface RoleRepository {
    findById(id: string): Promise<Result<Role>>;
    save(role: Role): Promise<Result<Role>>;
    findByName(name: string): Promise<Result<Role>>;
}