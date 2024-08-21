export interface ApiResult {
  rc: number
  msg: string
  data?: any
}

export default interface ApiResponse<T> {
  rc: number
  msg: string
  data?: T
}
