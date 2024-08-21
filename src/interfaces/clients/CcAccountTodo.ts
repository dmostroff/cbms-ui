import type ClientData from '@/interfaces/clients/ClientData'

export default interface CcAccountTodo extends ClientData {
  cc_account_id?: number | null
  task?: string | null
  description?: string | null
  assigned_to?: string | null
  task_status?: string | null
  due_on?: string | null
}
