import ClientDataModel from 'src/models/clients/ClientDataModel'
import type ClientAddress from '@/interfaces/clients/ClientAddress'

export class ClientAddressModel extends ClientDataModel implements ClientAddress {
  id: number | null
  client_id: number | null
  client_code: string | null
  street_address?: string | null
  city?: string | null
  state?: string | null
  zip?: string | null
  is_current?: boolean | null
  recorded_on?: string | null

  constructor(indata = null) {
    super(null)
    this.id = null
    this.client_id = null
    this.client_code = null
    this.street_address = null
    this.city = null
    this.state = null
    this.zip = null
    this.is_current = false
    this.recorded_on = null
    if (indata) {
      Object.assign(this, indata)
    }
  }

  isValid() {
    const required_fields = ['client_code', 'street_address', 'city', 'zip']
    return super.isDataValid(required_fields)
  }
}
