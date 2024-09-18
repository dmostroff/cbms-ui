import type User from '@/interfaces/common/User'
import type UserLoginInfo from '@/interfaces/common/UserLoginInfo'

export interface LoginInfo {
  username: string
  pwd: string
}

export interface LoginResult {
  user: User
  user_login: UserLoginInfo
}

export interface LogoutInfo {
  username: string
}

export interface LogoutResult {
  rc: number
  msg: string
}