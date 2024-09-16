export class AuthUserModel {
  id: number | null
  username: string
  password: string | null
  first_name: string
  last_name: string
  email: string | null
  is_superuser: boolean
  is_staff: boolean
  is_active: boolean
  password_hint: string | null
  roles: any | null
  created_at: Date | null
constructor(username : string, first_name: string, last_name: string) {
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
