import type ClientData from '@/interfaces/clients/ClientData'

export default interface CreditReport extends ClientData {
  credit_bureau: string | null
  login: string | null
  pwd: string | null
  pin: string | null
}
