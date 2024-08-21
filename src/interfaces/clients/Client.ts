import type ClientPerson from './ClientPerson'
import type CreditSummary from './CreditSummary'
import type ClientAddress from './ClientAddress'
import type ClientIsrael from './ClientIsrael'
import type CcAccount from './CcAccount'
import type CreditReport from './CreditReport'
import type ClientLoan from './ClientLoan'
import type Checking from './Checking'
import type CreditLineHistory from './CreditLineHistory'

export default interface Client {
  person: ClientPerson
  credit_summary: CreditSummary
  addresses: ClientAddress[]
  client_israels: ClientIsrael[]
  cc_accounts: CcAccount[]
  loans: ClientLoan[]
  credit_reports: CreditReport[]
  checkings: Checking[]
  credit_line_histories: CreditLineHistory[]
}

export interface Clients {
  clients: ClientPerson[]
}
