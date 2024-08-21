export default interface User {
  id: number
  username: string | null
  first_name: string | null
  last_name: string | null
  email: string | null
  is_superuser: boolean
  is_staff: boolean
  is_active: boolean
  password_hint: string | null
  roles?: string | null
  recorded_on?: string | null
}
