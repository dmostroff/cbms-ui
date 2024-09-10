import type { LoginInfo, LoginResult } from '@/interfaces/common/LoginInfo'
// import type UserLoginInfo from '@/interfaces/common/UserLoginInfo'
import userLoginStore from '@/stores/UserLoginStore'
import apiService from '@/services/ApiService'
import type { ApiResult } from '../interfaces/common/ApiResponse'
import ApiError from '@/models/common/ApiError'
import { getActivePinia } from 'pinia'
import UserLoginInfo from '../interfaces/common/UserLoginInfo'
// import router from '../router'

const defaultUserLoginStore = {
  StartPage: '',
  UserInfo: {},
  UserLogin: {},
  ErrorMsg: ''
}
let myUserLoginStore = getActivePinia() ? userLoginStore() : defaultUserLoginStore


const storeUserName = (username: string) => localStorage.setItem('username', username)
const AUTH_TOKEN_NAME = apiService.getAuthTokenName()

const clearLocalStorage = () => {
  localStorage.removeItem(AUTH_TOKEN_NAME)
  localStorage.removeItem('exp_date')
  localStorage.removeItem('user')
}

// const storeAuthorizationToken = (loginResult: LoginResult) => {
//   if (typeof resp.headers == "object" && AUTH_TOKEN_NAME in resp.headers) {
//     localStorage.setItem(
//       AUTH_TOKEN_NAME,
//       resp.headers[AUTH_TOKEN_NAME]
//     );
//   }
// };

// const storeAuthorizationToken = () => {
//   localStorage.setItem(AUTH_TOKEN_NAME, apiService.getAuthToken())
// }

const clearAuthorizationToken = () => {
  localStorage.removeItem(AUTH_TOKEN_NAME)
}

const getUserStartPage = (loginResult: LoginResult): string => {
  return loginResult.user_login.startpage ?? 'home'
}

const storeExpDate = ( user_login: UserLoginInfo) => {
  const d = new Date()
  d.setMinutes(d.getMinutes() + 60)
  let exp_date: string = d.toISOString()
  if (
    'exp_date' in user_login &&
    user_login.exp_date
  ) {
    exp_date = user_login.exp_date
  }
  localStorage.setItem('exp_date', exp_date)
} 

const storeToken = ( user_login: UserLoginInfo) => {
  if ('token' in user_login && user_login.token) {
    localStorage.setItem(AUTH_TOKEN_NAME, user_login.token)
  }
}

const storeUserInfo = (loginResult: LoginResult) => {
  console.log( loginResult)
  if ('user' in loginResult) {
    localStorage.setItem('user', JSON.stringify(loginResult.user))
  }
  if ('user_login' in loginResult) {
    storeExpDate( loginResult.user_login)
    storeToken( loginResult.user_login)
  }
}

const storeLoginResult = (loginResult: LoginResult) => {
  myUserLoginStore = userLoginStore()
  myUserLoginStore.setUser(loginResult.user)
  myUserLoginStore.setUserLogin(loginResult.user_login)
}

const login = async (loginInfo: LoginInfo): Promise<LoginResult|ApiResult> => {
  myUserLoginStore = getActivePinia() ? userLoginStore() : defaultUserLoginStore
  // const userLogin = userLoginStore();
  clearAuthorizationToken()
  storeUserName(loginInfo.username)
  try {
    const loginResult = await apiService.post('onboard/login', loginInfo) as Promise<LoginResult>
    // storeAuthorizationToken()
    storeUserInfo(loginResult)
    storeLoginResult(loginResult)
    console.log(loginResult)
    return loginResult as LoginResult
  } catch (error: any) {
    console.log(error)
    //const err = new ApiError(error)
    //return Promise.reject(err)
  }
}

const logout = async (logoutInfo: LoginInfo): Promise<any> => {
  try {
    const resp = (await apiService.post('onboard/logout', logoutInfo)) as LoginResult
    clearLocalStorage()
    return resp
  } catch (error: any) {
    return Promise.reject(new ApiError(error))
  }
}

const isLoggedIn = (): boolean => {
  // console.log(localStorage.getItem( 'username') );
  const cur_time = Date.parse(new Date().toISOString())
  const exp_date_text = localStorage.getItem('exp_date')
  let retval = false
  if (exp_date_text) {
    const exp_date = Date.parse(exp_date_text)
    retval =
      localStorage.getItem(apiService.getAuthTokenName()) && exp_date > cur_time ? true : false
  }
  //console.log( retval, cur_time, exp_date)
  return retval
}

const userName = (): string | null => {
  return localStorage.getItem('username')
}

const clear = () => {
  clearLocalStorage()
}

const loginInfo = {
  username: userName(),
  pwd: ''
} as LoginInfo


// const isLoggedIn = (): boolean => {
//   return userLoginStore().IsLoggedIn
// }

const getUserName = (): string => {
  return userLoginStore().UserName
}

const getUserInfo = () => {
  const myUserLoginStore = userLoginStore()
  return myUserLoginStore.UserInfo
}

const getUserLogin = () => {
  const myUserLoginStore = userLoginStore()
  return myUserLoginStore.UserLogin
}

const getErrorMsg = () => {
  return userLoginStore().ErrorMsg
}

const getStartPage = () => {
  const myUserLoginStore = userLoginStore()
  return (myUserLoginStore.StartPage ? myUserLoginStore.StartPage : 'clients')
}

const loginService = {
  loginInfo: loginInfo,
  login: login,
  logout: logout,
  isLoggedIn: isLoggedIn,
  getUserName: getUserName,
  getUserStartPage: getUserStartPage,
  clear: clear,
  getUserInfo: getUserInfo,
  getUserLogin: getUserLogin,
  getErrorMsg: getErrorMsg,
  getStartPage: getStartPage
}

export default loginService
