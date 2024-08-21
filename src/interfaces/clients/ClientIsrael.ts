import type ClientData from '@/interfaces/clients/ClientData'

export default interface ClientIsrael extends ClientData {
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
}
