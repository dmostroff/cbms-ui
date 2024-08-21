export class AuthRoleModel {
  constructor(id, role, description) {
    this.id = id;
    this.role = role;
    this.description = description;
  }
  static defaultRole = "user";
}
