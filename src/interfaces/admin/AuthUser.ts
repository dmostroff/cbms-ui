export default interface AuthUser {
  id: number
  username: string
  password: string
  first_name: string
  last_name: string
  email: string
  is_superuser: boolean
  is_staff: boolean
  is_active: boolean
  password_hint: string | null
  roles: string
  recorded_on?: string
}
