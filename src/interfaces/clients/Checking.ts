import type ClientData from '@/interfaces/clients/ClientData'

export default interface Checking extends ClientData {
  xero_id?: string | null
  xero_main: boolean | null
  client_code_additional?: string | null
  name_on_account?: string | null
  account_status?: string | null
  device?: string | null
  open_date?: string | null
  login?: string | null
  pwd?: string | null
  bank?: string | null
  routing?: string | null
  account?: string | null
  member_number?: string | null
  debit_card_name?: string | null
  debit_card_exp?: string | null
  debit_card_cvv?: string | null
  debit_card_pin?: string | null
  phone_pin?: string | null
  reconciled_on?: string | null
  zelle?: string | null
  wise?: string | null
  wise_device?: string | null
  checking_info?: string | null
  task?: string | null
  notes?: string | null
}
