import { defineStore } from 'pinia'
import type User from '@/interfaces/common/User'
import type UserLoginInfo from '@/interfaces/common/UserLoginInfo'

// interface UserLoginStore {
//   isLoggedIn: boolean
//   userName: string
//   user?: User | null
//   authToken?: string | null
//   authTokenName: string
//   startPage: string
//   errorMsg?: string | null
//   userLogin?: UserLoginInfo | null
// }

const default_user: User = {
  id: 0,
  username: null,
  first_name: null,
  last_name: null,
  email: null,
  is_superuser: true,
  is_staff: true,
  is_active: true,
  password_hint: null,
  roles: null,
  recorded_on: null
}

const default_user_login: UserLoginInfo = {
  action: null,
  id: null,
  username: null,
  token: null,
  exp_date: null,
  startpage: null
}

const userLoginStore = defineStore('userLoginStore', {
  state: () => ({
    isLoggedIn: false,
    userName: localStorage.getItem('username'),
    user: {} as User,
    authToken: null as string | null,
    authTokenName: 'auctoritas',
    startPage: 'sysadmin',
    errorMsg: '' as string,
    userLogin: {} as UserLoginInfo
  }),
  getters: {
    LoginInfo: (state) => {
      return { username: state.userName, pwd: '' }
    },
    IsLoggedIn: (state): boolean => state.isLoggedIn,
    UserName: (state): string | null => state.userName,
    AuthToken: (state): string | null => state.authToken,
    AuthTokenName: (state): string => state.authTokenName,
    StartPage: (state): string => state.startPage,
    UserInfo: (state): User => state.user,
    UserLogin: (state): UserLoginInfo => state.userLogin,
    ErrorMsg: (state): string => state.errorMsg
  },
  actions: {
    setIsLoggedIn(isLoggedIn: boolean) {
      this.isLoggedIn = isLoggedIn
    },
    setUserName(userName: string) {
      this.userName = userName
    },
    setAuthToken(authToken: string) {
      this.authToken = authToken
      // console.log("userLoginStore", authToken, this.authToken);
    },
    setStartPage(startPage: string) {
      this.startPage = startPage
    },
    setUser(user: User) {
      this.user = user
    },
    setUserLogin(userLogin: UserLoginInfo) {
      this.userLogin = userLogin
    },
    clear() {
      this.isLoggedIn = false
      this.userName = null
      this.authToken = null
      this.user = default_user
      this.userLogin = default_user_login
    }
  }
})

export default userLoginStore
