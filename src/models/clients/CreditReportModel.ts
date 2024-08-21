import type CreditReport from '@/interfaces/clients/CreditReport'
import ClientDataModel from 'src/models/clients/ClientDataModel'

export class CreditReportModel extends ClientDataModel implements CreditReport {
  credit_bureau: string | null
  login: string | null
  pwd: string | null
  pin: string | null
  constructor(indata = null) {
    super(null)
    this.id = 0
    this.client_id = null
    this.client_code = null
    this.credit_bureau = null
    this.login = null
    this.pwd = null
    this.pin = null
    this.recorded_on = null
    if (indata) {
      Object.assign(this, indata)
    }
  }
}
