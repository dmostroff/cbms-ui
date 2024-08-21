import type ClientData from '@/interfaces/clients/ClientData'

export default interface ClientPerson extends ClientData {
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
}
