import type ClientData from '@/interfaces/clients/ClientData'

export default interface ClientAddress extends ClientData {
  street_address?: string | null
  city?: string | null
  state?: string | null
  zip?: string | null
  is_current?: boolean | null
}
