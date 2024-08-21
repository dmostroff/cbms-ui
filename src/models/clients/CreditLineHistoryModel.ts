import ClientDataModel from 'src/models/clients/ClientDataModel'
import type CreditLineHistory from '@/interfaces/clients/CreditLineHistory'

export class CreditLineHistoryModel extends ClientDataModel implements CreditLineHistory {
  card_id?: string | null
  xero_id?: string | null
  cl_date?: string | null
  amount?: string | null
  cl_status?: string | null
  notes?: string | null
  cl_info?: string | null

  constructor(indata = null) {
    super(null)
    this.id = 0
    this.client_id = null
    this.client_code = null
    this.card_id = null
    this.xero_id = null
    this.cl_date = null
    this.amount = null
    this.cl_status = null
    this.notes = null
    this.cl_info = null
    this.recorded_on = null
    if (indata) {
      Object.assign(this, indata)
    }
  }
}
