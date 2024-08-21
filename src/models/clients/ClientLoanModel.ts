import type ClientData from '@/interfaces/clients/ClientData'
import ClientDataModel from 'src/models/clients/ClientDataModel'
import { formatDate } from '@/services/CommonService'
import type ClientLoan from '@/interfaces/clients/ClientLoan'
import type ClientPerson from '@/interfaces/clients/ClientPerson'

export class ClientLoanModel extends ClientDataModel implements ClientLoan {
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

  constructor(indata = null) {
    super(null)
    this.id = null
    this.client_id = null
    this.xero_id = null
    this.client_code = null
    this.first_name = null
    this.last_name = null
    this.card_name = null
    this.loan_status = null
    this.device = null
    this.open_date = null
    this.login = null
    this.pwd = null
    this.loan_number = null
    this.reconciled_on = null
    this.credit_line = null
    this.autopay_account = null
    this.due_on = null
    this.loan_type = null
    this.maturity_on = null
    this.loan_info = null
    this.task = null
    this.notes = null
    this.recorded_on = null
    if (indata) {
      Object.assign(this, indata)
    }
  }

  init(clientLoan: ClientLoan) {
    // this.first_name = clientPerson.first_name
    // this.last_name = clientPerson.last_name
    super.init(clientLoan)
  }

  sanitize = (): ClientData => {
    return ClientLoanModel.sanitizeData(this)
  }

  static sanitizeData = (item: ClientLoan) => {
    if (item.open_date) {
      item.open_date = formatDate(item.open_date)
    }
    if (item.reconciled_on) {
      item.reconciled_on = formatDate(item.reconciled_on)
    }
    if (item.due_on) {
      item.due_on = formatDate(item.due_on)
    }
    return super.sanitizeClientData(item as ClientData)
  }

  isValid() {
    const required_fields = ['client_code', 'first_name', 'last_name', 'card_name', 'loan_number']
    return super.isDataValid(required_fields)
  }
}
