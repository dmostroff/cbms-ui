import ClientDataModel from 'src/models/clients/ClientDataModel'
import { formatDate } from '@/services/CommonService'

export class CcAccountModel extends ClientDataModel {
  constructor(indata = null) {
    super(null)
    this.id = null
    this.client_id = null
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
    this.recorded_on = null
    if (indata) {
      Object.assign(this, indata)
    }
  }

  init(clientPerson) {
    super.init(clientPerson)
    this.first_name = clientPerson.first_name
    this.last_name = clientPerson.last_name
    this.client_name = clientPerson.last_name + ', ' + clientPerson.first_name
  }

  setCardXeroId(card_code) {
    this.xero_id = card_code + '-' + this.client_code
  }

  sanitize() {
    return CcAccountModel.sanitizeData(this)
  }

  static sanitizeData = (item) => {
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
