// import type AxiosResponse from 'axios'
import api from './api'
// import type ApiResponse from '@/interfaces/ApiResponse'
import ApiError from '@/models/common/ApiError'

const apiService = {
  get: async <T>(url: string): Promise<T> => {
    try {
      const response = await api.get(url)
      if (response.rc == 1) {
        return response.data as T
      } else {
        throw new ApiError(response)
      }
    } catch (error: any) {
      console.error(error)
      return Promise.reject(new ApiError(error))
    }
  },
  post: async <T>(url: string, body: {}): Promise<T> => {
    try {
      const response = await api.post(url, body)
      return response as T
    } catch (error: any) {
      console.error(error)
      return Promise.reject(new ApiError(error))
    }
  },
  delete: async <T>(url: string): Promise<T> => {
    try {
      const response = await api.delete(url)
      return response as T
    } catch (error: any) {
      console.error(error)
      return Promise.reject(new ApiError(error))
    }
  },
  getAuthTokenName: (): string => api.getAuthorizationTokenName(),
  getAuthToken: (): string => api.getAuthorizationToken(),
  getBaseUrl: (): string => api.baseUrl
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
