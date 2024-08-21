import type ClientData from '@/interfaces/clients/ClientData'
import type ClientPerson from '@/interfaces/clients/ClientPerson'
import ClientDataModel from '@/models/clients/ClientDataModel'
//import { formatDate } from '@/services/commonService'

export default class ClientPersonModel extends ClientDataModel implements ClientPerson {
  client_name: string
  last_name: string
  first_name: string
  middle_name?: string | null
  dob?: Date | null
  ssn?: string | null
  mmn?: string | null
  email?: string | null
  pwd?: string | null
  occupation?: string | null
  employer?: string | null
  income: number
  phone?: string | null
  phone_2?: string | null
  contact_email?: string | null
  tax_status?: string | null
  wise?: boolean | null
  client_status?: string | null
  notes?: string | null
  client_info?: string | null

  constructor(indata: Partial<ClientPersonModel> | null = null) {
    super()
    this.client_name = ''
    this.last_name = ''
    this.first_name = ''
    this.middle_name = null
    this.dob = null
    this.ssn = null
    this.mmn = null
    this.email = null
    this.pwd = null
    this.occupation = null
    this.employer = null
    this.income = 0
    this.phone = null
    this.phone_2 = null
    this.contact_email = null
    this.tax_status = null
    this.wise = null
    this.client_status = null
    this.notes = null
    this.client_info = null

    if (indata) {
      Object.assign(this, indata)
    }

    if (this.last_name && this.first_name && this.dob) {
      const dob = this.dob as Date
      this.client_code = (
        this.first_name.slice(0, 2) +
        this.last_name.slice(0, 1) +
        dob.getFullYear().toString().slice(-2)
      ).toUpperCase()
    }
  }

  init(clientPerson: ClientPerson, dob: Date | null = null): void {
    super.init(clientPerson as ClientData)
    this.last_name = clientPerson.last_name
    this.first_name = clientPerson.first_name
    this.dob = dob

    if (this.last_name && this.first_name && this.dob) {
      this.client_code = (
        this.first_name.slice(0, 2) +
        this.last_name.slice(0, 1) +
        this.dob.getFullYear().toString().slice(-2)
      ).toUpperCase()
    }
  }

  sanitize = (): ClientPerson => {
    return ClientPersonModel.sanitizePersonData(this as ClientPerson)
  }

  static sanitizePersonData(item: ClientPerson): ClientPerson {
    // item.dob = item.dob ? formatDate(item.dob) : null
    return super.sanitizeClientData(item) as ClientPersonModel
  }

  isValid(): boolean {
    const required_fields = ['client_code', 'first_name', 'last_name']
    const retval = super.isDataValid(required_fields)
    const validDates = super.isValidDates(['dob'])
    return retval && validDates
  }
}
