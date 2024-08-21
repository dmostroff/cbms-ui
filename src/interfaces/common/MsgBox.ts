export default interface MsgBox {
  id?: number
  title: string
  prompt: string
  message?: string
  areyousure?: boolean
  dialog?: boolean
}
