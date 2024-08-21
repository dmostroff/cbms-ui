// import type ClientData from '@/interfaces/clients/ClientData'
import ClientDataModel from '@/models/clients/ClientDataModel'
import type ClientIsrael from '@/interfaces/clients/ClientIsrael'

export class ClientIsraelModel extends ClientDataModel implements ClientIsrael {
  id: number | null
  client_id: number | null
  client_code?: string | null
  bank?: string | null
  branch?: string | null
  account?: string | null
  iban?: string | null
  iban_name?: string | null
  address?: string | null
  city?: string | null
  zip?: string | null
  phone?: string | null
  notes?: string | null
  recorded_on?: string | null

  constructor(indata = null) {
    super(null)
    this.id = null
    this.client_id = null
    this.client_code = null
    this.bank = null
    this.branch = null
    this.account = null
    this.iban = null
    this.iban_name = null
    this.address = null
    this.city = null
    this.zip = null
    this.phone = null
    this.notes = null
    this.recorded_on = null
    if (indata) {
      Object.assign(this, indata)
    }
  }

  isValid() {
    const required_fields = ['client_code', 'bank', 'account', 'address', 'zip']
    return super.isDataValid(required_fields)
  }
}
