import type CcAccount from "@/interfaces/clients/CcAccount"
import type ClientPerson from '@/interfaces/clients/ClientPerson'
import ClientDataModel from '@/models/clients/ClientDataModel'
import { formatDate } from '@/services/CommonService'

export class CcAccountModel extends ClientDataModel implements CcAccount {
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

  constructor(indata = null) {
    super(null)
    this.xero_id = null
    this.client_code = null
    this.first_name = null
    this.last_name = null
    this.client_name = null
    this.card_name = null
    this.card_status = null
    this.device = null
    this.open_date = null
    this.cc_login = null
    this.cc_pwd = null
    this.card_number = null
    this.card_exp = null
    this.card_cvv = null
    this.card_pin = null
    this.reconciled_on = null
    this.charged_on = null
    this.credit_line = null
    this.due_on = null
    this.bonus_to_spend = null
    this.bonus_spend_by = null
    this.bonus_spent = null
    this.ccaccount_info = null
    this.task = null
    this.in_charge = null
    this.notes = null
    if (indata) {
      Object.assign(this, indata)
    }
  }

  init(clientPerson: ClientPerson) {
    super.init(clientPerson)
    this.first_name = clientPerson.first_name
    this.last_name = clientPerson.last_name
    this.client_name = clientPerson.last_name + ', ' + clientPerson.first_name
  }

  setCardXeroId(card_code: string) {
    this.xero_id = card_code + '-' + this.client_code
  }

  sanitize() {
    return CcAccountModel.sanitizeData(this)
  }

  static sanitizeData = (item: CcAccount) => {
    ;['open_date', 'reconciled_on', 'charged_on', 'due_on'].forEach(
      (member) => (item[member] = formatDate(item[member]))
    )
    return super.sanitizeData(item)
  }

  isValid() {
    const required_fields = [
      // "first_name",
      // "last_name",
      // "card_name",
      // "card_number",
      // "card_exp",
      // "card_cvv",
      'card_pin'
    ]
    return super.isValid(required_fields)
  }
}
