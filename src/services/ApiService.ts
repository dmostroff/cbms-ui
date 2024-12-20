import { getActivePinia } from 'pinia'
import { AxiosError } from 'axios'
import { ApiResult } from '../interfaces/common/ApiResponse'
import api from './api'
// import type ApiResponse from '@/interfaces/ApiResponse'
import type IApiError from '@/interfaces/api/IApiError'
import ApiError from '@/models/common/ApiError'
import apiStore from '@/stores/apiStore'

const setAxiosError = (error: typeof AxiosError) => {
  apiStore().setAxiosError(error)
}

const clearAxiosError = () => {
  return apiStore().clearAxiosError()
}

const setMessage = (message: string) => {
  apiStore().setMessage(message)
}

const setApiError = (error: IApiError | undefined) => {
  console.log("setApiError", error)
  apiStore().setApiError(error)
}

const clearApiError = () => {
  apiStore().clearApiError()
}

const setError = (error: any) => {
  apiStore().setError(error)
}

const clearError = () => {
  apiStore().clearError()
}

const getMessage = (): string => apiStore().Message

const getApiError = (): IApiError => {
  return apiStore().TheApiError
}

const getAxiosError = (): typeof AxiosError | undefined => {
  return apiStore().TheAxiosError
}

const getError = (): any => {
  return apiStore().Error
}

const apiService = {
  get: async <T>(url: string): Promise<T> => {
    try {
      const response = await api.get(url) as ApiResult
      console.log( response, typeof response)
      if (response && 'rc' in response) {
        setMessage(response.msg)
        if( response.rc == 1) {
          return response.data as T
        } else {
          setApiError(response as IApiError);
        }
      } else {
        setError(response)
      }
    } catch (error: any) {
      console.error(error)
      setApiError( error)
      return Promise.reject(error)
    }
  },
  post: async <T>(url: string, body: {}): Promise<T> => {
    try {
      const response = await api.post(url, body) as ApiResult
      setMessage(response.msg)
      if ( response && 'rc' in response && response.rc == 1) {
        return response.data as T
      } else {
        console.log( 'setApiError', response)
        setApiError( response as IApiError | undefined)
      }
      return response as T
    } catch (error: any) {
      console.error(error)
      setError( error)
      return Promise.reject(new ApiError(error))
    }
  },
  postRaw: async <T>(url: string, body: {}): Promise<T> => {
    try {
      const response = await api.post(url, body) as ApiResult
      setMessage(response.msg)
      if ( response && 'rc' in response && response.rc == 1) {
        return response as T
      } else {
        setApiError( response as IApiError | undefined)
      }
      return response as T
    } catch (error: any) {
      console.error(error)
      setError( error)
      return Promise.reject(new ApiError(error))
    }
  },
  delete: async <T>(url: string): Promise<T> => {
    try {
      const response = await api.delete(url) as ApiResult
      setMessage(response.msg)
      return response as T
    } catch (error: any) {
      console.error(error)
      setError( error)
      return Promise.reject(new ApiError(error))
    }
  },
  getAuthTokenName: (): string => api.getAuthorizationTokenName(),
  getAuthToken: (): string => api.getAuthorizationToken(),
  getBaseUrl: (): string => api.baseUrl,
  getMessage: getMessage,
  setAxiosError: setAxiosError,
  getApiError: getApiError,
  getAxiosError: getAxiosError,
  getError: getError,
  clearApiError: clearApiError,
  clearError: clearError,
  clearAxiosError: clearAxiosError,
  getIsError: () => apiStore().IsError
  // requestResponse: (response) => {
  //   let retval = { rc: -9, msg: "No response", data: null };
  //   if (!response || response == null) {
  //     return retval;
  //   }
  //   console.log(response);
  //   if (typeof response == "string") {
  //     retval = response;
  //   } else if (typeof response == "object" && "data" in response) {
  //     retval = response.data;
  //   }
  //   return retval;
  // },
}

export default apiService
