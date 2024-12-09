import { BaseEntity } from "../../../../shared/domain/base.entity";

export class User extends BaseEntity  {
  private constructor(
    id: string,
    private _email: string,
    private _passwordHash: string,
    private _roleId: string,
    createdAt: Date,
    updatedAt?: Date
  ){
    super(id, createdAt, updatedAt);
  }

  get email(): string {
    return this._email;
  }

  private set email(value: string) {
    this._email = value;
  }

  get passwordHash(): string {
    return this._passwordHash;
  }

  private set passwordHash(value: string) {
    this._passwordHash = value;
  }

  get roleId(): string {
    return this._roleId;
  }

  private set roleId(value: string) {
    this._roleId = value;
  }

  static create(email: string, passwordHash: string, role_id: string): User {
    return new User(
      crypto.randomUUID(),
      email,
      passwordHash,
      role_id,
      new Date()
    );
  }

  static fromPersistence(id: string, email: string, passwordHash: string, roleId: string, createdAt: Date, updatedAt?: Date): User {
    return new User(id, email, passwordHash, roleId, createdAt, updatedAt);
  }
}