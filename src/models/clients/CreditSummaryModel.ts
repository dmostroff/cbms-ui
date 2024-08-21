import { formatDate } from '@/services/CommonService'
import type ClientPerson from '@/interfaces/clients/ClientPerson'

export default class CreditSummaryModel {
  client_id: number | null
  client_code?: string | null
  client_name: string | null
  cc_account_count: string | null
  loan_count: string | null
  checking_count: string | null
  email: string | null
  phone: string | null
  min_open_date: string | null
  total_credit_limit: string | null
  credit_limit: string | null
  constructor(clientPerson: ClientPerson) {
    this.client_id = clientPerson.id
    this.client_code = clientPerson.client_code
    this.client_name = clientPerson.first_name + ' ' + clientPerson.last_name
    this.cc_account_count = null
    this.loan_count = null
    this.checking_count = null
    this.email = null
    this.phone = null
    this.min_open_date = null
    this.total_credit_limit = null
    this.credit_limit = null
  }

  sanitize() {
    return CreditSummaryModel.sanitizeData(this)
  }
  static sanitizeData = (item: CreditSummaryModel) => {
    if (item && 'min_open_date' in item) {
      item.min_open_date = formatDate(item.min_open_date)
    }
    return item
  }
}
