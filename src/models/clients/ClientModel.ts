import type CcAccount from '@/interfaces/clients/CcAccount'
import type Checking from '@/interfaces/clients/Checking'
import type Client from '@/interfaces/clients/Client'
import type ClientData from '@/interfaces/clients/ClientData'
import type ClientAddress from '@/interfaces/clients/ClientAddress'
import type ClientIsrael from '@/interfaces/clients/ClientIsrael'
import type ClientLoan from '@/interfaces/clients/ClientLoan'
import type ClientPerson from '@/interfaces/clients/ClientPerson'
// import type { CreditBuild } from '@/interfaces/clients/CreditBuild'
import type CreditLineHistory from '@/interfaces/clients/CreditLineHistory'
import type CreditReport from '@/interfaces/clients/CreditReport'
import type CreditSummary from '@/interfaces/clients/CreditSummary'

import ClientPersonModel from '@/models/clients/ClientPersonModel'
import CreditSummaryModel from '@/models/clients/CreditSummaryModel'

export default class ClientModel implements Client {
  person: ClientPerson
  credit_summary: CreditSummary
  addresses: ClientAddress[]
  client_israels: ClientIsrael[]
  cc_accounts: CcAccount[]
  loans: ClientLoan[]
  credit_reports: CreditReport[]
  checkings: Checking[]
  credit_line_histories: CreditLineHistory[]

  constructor() {
    this.person = new ClientPersonModel()
    this.credit_summary = new CreditSummaryModel(this.person)
    this.addresses = [] as ClientAddress[]
    this.client_israels = [] as ClientIsrael[]
    this.cc_accounts = [] as CcAccount[]
    this.loans = [] as ClientLoan[]
    this.credit_reports = [] as CreditReport[]
    this.checkings = [] as Checking[]
    this.credit_line_histories = [] as CreditLineHistory[]
  }
  static newClient() {
    return {
      person: new ClientPersonModel(),
      credit_summary: {} as CreditSummary,
      address: [] as ClientAddress[],
      client_israel: [] as ClientIsrael[],
      cc_account: [] as CcAccount[],
      loan: [] as ClientLoan[],
      credit_report: [] as CreditReport[],
      checking: [] as Checking[],
      credit_line_history: [] as CreditLineHistory[]
    }
  }
  static sanitizeArray(modelClass: any, itemArray: object) {
    if (Array.isArray(itemArray)) {
      itemArray.forEach((item) => {
        item = modelClass.sanitizeData(item)
      })
    }
    return itemArray
  }

  static sanitizeData = (client: Client) => {
    if (!client) {
      return client
    }
    client.person = ClientPersonModel.sanitizePersonData(client.person)
    client.creditSummary = CreditSummaryModel.sanitizeData(client.person)
    client.address = this.sanitizeArray(ClientAddressModel, client.address)
    client.client_israel = this.sanitizeArray(ClientIsraelModel, client.client_israel)
    client.cc_account = this.sanitizeArray(CcAccountModel, client.cc_account)
    client.loan = this.sanitizeArray(ClientLoanModel, client.loan)
    client.credit_report = this.sanitizeArray(CreditReportModel, client.credit_report)
    client.checking = this.sanitizeArray(CheckingModel, client.checking)
    client.credit_line_history = this.sanitizeArray(
      CreditLineHistoryModel,
      client.credit_line_history
    )
    return client
  }

  static getClientSectionDataItem(sectionName: string, indata: Record<string, any> = null) {
    const modelFuncs = {
      person: ClientPersonModel,
      address: ClientAddress,
      cc_account: CcAccountModel,
      checking: CheckingModel,
      credit_line_history: CreditLineHistoryModel,
      credit_report: CreditReportModel,
      client_israel: ClientIsraelModel,
      loan: ClientLoanModel,
      credit_build: CreditBuildModel,
      credit_summary: CreditSummaryModel
    }
    return sectionName in modelFuncs ? new modelFuncs[sectionName](indata) : null
  }

  static newClientDataItem(sectionName, clientPerson = null) {
    const newDataItem = ClientModel.getClientSectionDataItem(sectionName, null)
    newDataItem.id = 0
    if (clientPerson) {
      newDataItem.client_id = clientPerson.id
      newDataItem.client_code = clientPerson.client_code
    }
    return newDataItem
  }
}
