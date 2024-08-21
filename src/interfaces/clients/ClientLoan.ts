import type ClientData from './ClientData'

export default interface ClientLoan extends ClientData {
  xero_id: string | null
  first_name?: string | null
  last_name?: string | null
  card_name?: string | null
  loan_status?: string | null
  device?: string | null
  open_date?: string | null
  login?: string | null
  pwd?: string | null
  loan_number?: string | null
  reconciled_on?: string | null
  credit_line?: string | null
  autopay_account?: string | null
  due_on?: string | null
  loan_type?: string | null
  maturity_on?: string | null
  loan_info?: string | null
  task?: string | null
  notes?: string | null
}
