import axios, {
  AxiosError,
  // AxiosHeaders,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig
} from 'axios'

//import token from './somewhere';
// import type { apiResult } from '@/interfaces/apiResult'
import type ApiResponse from '@/interfaces/common/ApiResponse'
import ApiError from '@/models/common/ApiError'

export const baseUrl = import.meta.env.VITE_API_BASE_URL
// console.log(baseUrl, process.env.NODE_ENV, process.env.VUE_APP_TITLE, process.env.VUE_APP_VERSION, process.env.VUE_APP_MODE)
export const AUTHORIZATION = 'auctoritas'
export const header = { AUTHORIZATION: '' }

const config: AxiosRequestConfig = {
  baseURL: baseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}
// Authorization: `process.env.BASIC`

const axiosApi = axios.create(config)
// program to generate random strings

// declare all characters
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

const generateString = (length: number) => {
  let result = ' '
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

const get_config = (httpmethod: string): AxiosRequestConfig => {
  const tk = generateString(64)
  const bearer_token = `Bearer ${tk}`
  const auth_token = localStorage.getItem(AUTHORIZATION)
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/json'
    }
  }
  return config
}
// Authorization: `Bearer ${bearer_token}`,
// auctoritas: auth_token

const defaultHandleAxiosError = (error: AxiosError) => {
  console.error('http_error', error.message)
  if (error.message != 'Network Error') {
    const http_error = { rc: -1, msg: error.message, data: error }
    throw new ApiError(http_error)
  }
}

axios.defaults.baseURL = baseUrl
// axios.defaults.headers.common['Authorization'] = 'Bearer'

axios.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.set('Content-Type', 'application/json; charset=utf-8')
  // let auth_token = localStorage.getItem(AUTHORIZATION)
  // if (!auth_token) {
  //   auth_token = generateString(64)
  // }
  // if (auth_token) {
  //   config.headers.set('Authorization', `Bearer ${auth_token}`)
  // }
  return config
})

const axiosErrorHandler = (axiosError: AxiosError) => {
  const errorFuncs = {
    400: (axiosError: AxiosError) =>
      console.log(axiosError.response ? axiosError.response.data : '400 error'),
    401: (axiosError: AxiosError) => console.log('unauthorized'),
    404: (axiosError: AxiosError) => console.log('not found'),
    500: (axiosError: AxiosError) => console.log('server error'),
    999: (axiosError: AxiosError) => defaultHandleAxiosError(axiosError)
  }
  const errorStatus = axiosError ? (axiosError.status ?? 999) : 999
  ;(errorFuncs[errorStatus] ?? errorFuncs[999])(axiosError)
  console.log(axiosError)
  console.error(axiosError)
  return Promise.reject(axiosError)
}

axios.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    header.AUTHORIZATION = response.headers[AUTHORIZATION]
    return response
  },
  async (error: AxiosError) => {
    axiosErrorHandler(error)
    return Promise.reject(error)
  }
)

const responseBody = (response: AxiosResponse) => response.data

const httpGet = async (url: string): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosApi.get<ApiResponse<T>>(url)
    return response.data
    // if (response.request.status == 200) {
    //   return response.data
    // }
  } catch (error: any) {
    return axiosErrorHandler(error as AxiosError)
  }
}

const httpPost = async (url: string, body: {}): Promise<ApiResponse<T>> => {
  try {
    const full_url = `${baseUrl}/${url}`
    const config = get_config('post')
    const response = await axiosApi.post<ApiResponse<T>>(full_url, body, config)
    return response.data
  } catch (error) {
    return axiosErrorHandler(error as AxiosError)
  }
}

const httpDelete = async (url: string): Promise<ApiResponse<T>> => {
  try {
    const response = await axiosApi.delete<ApiResponse<T>>(url)
    return response.data
  } catch (error) {
    return axiosErrorHandler(error as AxiosError)
  }
}

const getbaseUrl = (): string => {
  const x = baseUrl
  const y = axiosApi
  return x
}

const api = {
  get: httpGet,
  post: httpPost,
  delete: httpDelete,
  getAuthorizationTokenName: (): string => AUTHORIZATION,
  getAuthorizationToken: (): string => header.AUTHORIZATION,
  baseUrl: getbaseUrl()
}

export default api
