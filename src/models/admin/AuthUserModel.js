export class AuthUserModel {
  constructor(username, first_name, last_name) {
    this.id = null;
    this.username = username;
    this.password = null;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = null;
    this.is_superuser = false;
    this.is_staff = false;
    this.is_active = false;
    this.password_hint = null;
    this.roles = null;
    this.created_at = null;
  }
}
