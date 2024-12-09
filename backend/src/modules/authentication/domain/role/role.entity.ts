import { BaseEntity } from "../../../../shared/domain/base.entity";

export class Role extends BaseEntity {
  private constructor(
    id: string,
    private _name: string,
    private _description: string,
    createdAt: Date,
    updatedAt?: Date
  ) { super(id, createdAt, updatedAt); }

  get name(): string {
    return this._name;
  }

  private set name(value: string) {
    this._name = value;
  }

  get description(): string {
    return this._description;
  }

  private set description(value: string) {
    this._description = value;
  }

  static create(name: string, description: string): Role {
    return new Role(
      crypto.randomUUID(),
      name,
      description,
      new Date()
    );
  }

  static fromPersistence(id: string, name: string, description: string, createdAt: Date, updatedAt?: Date): Role {
    return new Role(id, name, description, createdAt, updatedAt);
  }
}
  