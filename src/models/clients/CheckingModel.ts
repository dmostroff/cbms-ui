import type ClientData from '@/interfaces/clients/ClientData'
import ClientDataModel from 'src/models/clients/ClientDataModel'
import { formatDate, formatDateTime } from '@/services/CommonService'
import type Checking from '@/interfaces/clients/Checking'
import type ClientPerson from '@/interfaces/clients/ClientPerson'

export class CheckingModel extends ClientDataModel implements Checking {
  id: number | null
  xero_id?: string | null
  xero_main: boolean | null
  client_id: number | null
  client_code?: string | null
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
  recorded_on?: string | null
  constructor(indata = null) {
    super(null)
    this.id = null
    this.xero_id = null
    this.xero_main = false
    this.client_id = null
    this.client_code = null
    this.client_code_additional = null
    this.name_on_account = null
    this.account_status = null
    this.device = null
    this.open_date = null
    this.login = null
    this.pwd = null
    this.bank = null
    this.routing = null
    this.account = null
    this.member_number = null
    this.debit_card_name = null
    this.debit_card_exp = null
    this.debit_card_cvv = null
    this.debit_card_pin = null
    this.phone_pin = null
    this.reconciled_on = null
    this.zelle = null
    this.wise = null
    this.wise_device = null
    this.checking_info = null
    this.task = null
    this.notes = null
    this.recorded_on = null
    if (indata) {
      Object.assign(this, indata)
    }
  }
  setCardXeroId(bank_code: string) {
    this.xero_id = bank_code + '-' + this.client_code
  }

  init(clientPerson: ClientPerson) {
    super.init(clientPerson)
    this.name_on_account = clientPerson.first_name + ' ' + clientPerson.last_name
  }

  sanitize() {
    return CheckingModel.sanitizeData(this)
  }

  static sanitizeData = (item: Checking) => {
    ;['open_date', 'reconciled_on'].forEach((member) => (item[member] = formatDate(item[member])))
    return super.sanitizeClientData(item as ClientData)
  }

  isValid() {
    const required_fields = ['client_code', 'name_on_account', 'routing', 'account']
    return super.isDataValid(required_fields)
  }
}
