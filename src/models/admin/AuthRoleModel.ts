export class AuthRoleModel {
  id: number
  role: string
  description: string
constructor(id: number, role: string, description: string) {
    this.id = id;
    this.role = role;
    this.description = description;
  }
  static defaultRole = "user";
}
