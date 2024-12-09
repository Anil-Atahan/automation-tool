export class RolePermission {
  private constructor(private _roleId: string, private _permissionId: string) {}

  get roleId(): string {
    return this._roleId;
  }

  private set roleId(value: string) {
    this._roleId = value;
  }

  get permissionId(): string {
    return this._permissionId;
  }

  private set permissionId(value: string) {
    this._permissionId = value;
  }

  static create(roleId: string, permissionId: string): RolePermission {
    return new RolePermission(roleId, permissionId);
  }

  static fromPersistence(roleId: string, permissionId: string): RolePermission {
    return new RolePermission(roleId, permissionId);
  }
}
  