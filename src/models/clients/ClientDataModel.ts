import { isValidDate, formatDateTime } from '@/services/CommonService'
import type ClientData from '@/interfaces/clients/ClientData'

export default class ClientDataModel implements ClientData {
  id: number
  client_id: number | null
  client_code?: string | null
  recorded_on?: string | null

  constructor(indata: Partial<ClientDataModel> | null = null) {
    this.id = 0
    this.client_id = null
    this.client_code = null
    this.recorded_on = null
    if (indata) {
      Object.assign(this, indata)
    }
  }

  init(clientPerson: ClientData): void {
    this.client_id = clientPerson.id
    this.client_code = clientPerson.client_code
  }

  assign(indata: Partial<ClientData>): void {
    Object.keys(this)
      .filter((item: string) => typeof (this as any)[item] !== 'function' && item in indata)
      .forEach((item: string) => ((this as any)[item] = (indata as any)[item]))
  }

  repr(): string {
    return Object.entries(this)
      .filter((item: [string, any]) => typeof item[1] !== 'function')
      .reduce(
        (acc: string, item: [string, any]) =>
          acc + (acc > '' ? '; ' : '') + `${item[0]}=${item[1]}`,
        ''
      )
  }

  to_data(): Record<string, any> {
    return Object.assign({}, this)
  }

  isDataValid(required_fields: string[] | null = null): boolean {
    const item = this as any
    if (required_fields) {
      return required_fields.reduce((acc: boolean, field: string) => acc && item[field] > '', true)
    } else {
      return true
    }
  }

  isValidDates(date_fields: string[] | null = null): boolean {
    const item = this as any
    let retval = true
    if (date_fields) {
      date_fields.forEach((dt: string) => {
        if (item[dt] && item[dt] > '') {
          retval = retval && isValidDate(item[dt])
        }
      })
    }
    return retval
  }

  sanitize = (): ClientData => {
    return ClientDataModel.sanitizeClientData(this)
  }

  static sanitizeClientData = (item: ClientData): ClientData => {
    item.recorded_on = formatDateTime(item.recorded_on + '')
    return item
  }
}
