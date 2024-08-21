import type ClientData from './ClientData'

export default interface CreditLineHistory extends ClientData {
  card_id?: string | null
  xero_id?: string | null
  cl_date?: string | null
  amount?: string | null
  cl_status?: string | null
  notes?: string | null
  cl_info?: string | null
}
