import type ClientData from '@/interfaces/clients/ClientData'

export default interface CcAccount extends ClientData {
  xero_id: string | null
  client_code: string | null
  first_name: string | null
  last_name: string | null
  client_name: string | null
  card_name: string | null
  card_status: string | null
  device: string | null
  open_date: string | null
  cc_login: string | null
  cc_pwd: string | null
  card_number: string | null
  card_exp: string | null
  card_cvv: string | null
  card_pin: string | null
  reconciled_on: string | null
  charged_on: string | null
  credit_line: string | null
  due_on: string | null
  bonus_to_spend: string | null
  bonus_spend_by: string | null
  bonus_spent: string | null
  ccaccount_info: string | null
  task: string | null
  in_charge: string | null
  notes: string | null
}
