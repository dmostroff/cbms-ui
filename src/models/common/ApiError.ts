import type { ApiResult } from '@/interfaces/common/ApiResponse'

class ApiError extends Error {
  constructor(api_error: ApiResult) {
    super(`${api_error.rc}] ${api_error.msg}`)
    this.name = 'ApiError'
  }
}

export default ApiError
