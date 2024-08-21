import type MsgBox from '@/interfaces/common/MsgBox'
export default class msgBoxModel implements MsgBox {
  id?: number
  title: string
  prompt: string
  message?: string
  areyousure?: boolean
  dialog?: boolean
  constructor(title = '', prompt = '', message = '', areyousure = false, dialog = false) {
    this.id = 0
    this.title = title
    this.prompt = prompt
    this.message = message
    this.areyousure = areyousure
    this.dialog = dialog
  }
}
