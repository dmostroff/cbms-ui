import apiService from '@/services/apiService'
import type Client from '@/interfaces/clients/Client'
import type { Clients } from '@/interfaces/clients/Client'
import type ClientPerson from '@/interfaces/clients/ClientPerson'
import clientStore from '@/stores/ClientStore'
import type ClientData from '@/interfaces/clients/ClientData'
import ClientPerson from '../../interfaces/clients/ClientPerson'

// const getClientsIfEmpty = async () => {
//   if (!clientStore.HasClients()) {
//     getClients()
//   }
// }

const myClientStore = clientStore()

const sectionUrls = {
  client: {
    title: 'Client',
    getUrl: 'client',
    postUrl: 'client/0',
    deleteUrl: 'client'
  },
  person: {
    title: 'Client Person',
    getUrl: 'client/person',
    postUrl: 'client/person/0',
    deleteUrl: 'client/person',
    childRoute: 'person'
  },
  address: {
    getUrl: 'client/address',
    postUrl: 'client/address/0',
    deleteUrl: 'client/address',
    childRoute: 'address'
  },
  cc_account: {
    getUrl: 'cc/accounts',
    postUrl: 'cc/account/0',
    deleteUrl: 'cc/account',
    childRoute: 'ccaccount'
  },
  checking: {
    getUrl: 'client/checkings',
    postUrl: 'client/checking/0',
    deleteUrl: 'client/checking',
    childRoute: 'checking'
  },
  credit_line_history: {
    getUrl: 'client/creditlines',
    postUrl: 'client/creditline/0',
    deleteUrl: 'client/creditline',
    childRoute: 'creditline'
  },
  credit_report: {
    getUrl: 'client/creditreports',
    postUrl: 'client/creditreport/0',
    deleteUrl: 'client/creditreport',
    childRoute: 'creditreport'
  },
  client_israel: {
    getUrl: 'client/israels',
    postUrl: 'client/israel/0',
    deleteUrl: 'client/israel',
    childRoute: 'israelinfo'
  },
  loan: {
    getUrl: 'client/loans',
    postUrl: 'client/loan/0',
    deleteUrl: 'client/loan',
    childRoute: 'loan'
  }
}

const getClients = async (): Promise<Client[]> => {
  const clients = (await apiService.get('clients')) as Client[]
  myClientStore.setClients(clients)
  return clients
}

const getClient = async (client_id: number): Promise<Client> => {
  const url = sectionUrls.client.getUrl
  const client = (await apiService.get(`${url}/${client_id}`)) as Client
  myClientStore.setClient(client)
  return client
}

const postClient = async (client: Client): Promise<Client> => {
  const url = sectionUrls.client.postUrl
  const new_client = (await apiService.post(`${url}/${client.person.id}`, client)) as Client
  return new_client
}

const deleteClient = async (client_id: number): Promise<Client> => {
  const url = sectionUrls.client.deleteUrl
  const client = (await apiService.delete(`${url}/${client_id}`)) as Client
  myClientStore.deleteClient(client_id)
  return client
}

const getClientPerson = async (client_id: number): Promise<ClientPerson> => {
  const url = sectionUrls.person.getUrl
  const client = (await apiService.get(`${url}/${client_id}`)) as Client
  myClientStore.setClientPerson(client.person)
  return client
}

const postClientPerson = async (clientPerson: ClientPerson): Promise<ClientPerson> => {
  const url = sectionUrls.person.postUrl
  const newClientPerson = (await apiService.post(
    `${url}/${clientPerson.id}`,
    clientPerson
  )) as ClientPerson
  myClientStore.setClientPerson(newClientPerson)
  return newClientPerson
}

const deleteClientPerson = async (client_id: number): Promise<ClientPerson> => {
  const url = sectionUrls.person.deleteUrl
  const response = (await apiService.delete(`${url}/${client_id}`)) as ClientPerson
  return response
}

const getItem = async (sectionName: string, item_id: number): Promise<ClientData> => {
  const url = sectionUrls[sectionName].getUrl
  const response = (await apiService.get(`${url}/${item_id}`)) as ClientData
  return response
}

const postItem = async <ClientData>(sectionName: string, item: ClientData): Promise<ClientData> => {
  const url = sectionUrls[sectionName].postUrl
  const response = (await apiService.post(`${url}/${item.id}`, item)) as ClientData
  return response
}

const deleteItem = async (sectionName: string, item_id: number): Promise<ClientData> => {
  const url = sectionUrls[sectionName].deleteUrl
  const response = (await apiService.delete(`${url}/${item_id}`)) as ClientData
  return response
}

const setSection = ( section: string) => {
  myClientStore.setSection(clients)

}

const getChildRoute = (section: string) => myClientStore.getChildRoute( section)

const ClientPerson = (): ClientPerson => myClientStore.ClientPerson

const clientService = {
  getClients: getClients,
  getClient: getClient,
  postClient: postClient,
  deleteClient: deleteClient,
  getClientPerson: getClientPerson,
  postClientPerson: postClientPerson,
  deleteClientPerson: deleteClientPerson,
  getItem: getItem,
  postItem: postItem,
  deleteItem: deleteItem,
  getClientsFilter: () => myClientStore.ClientsFilter,
  setClientsFilter: (filter: string) => myClientStore.setClientsFilter(filter),
  setClientStatusFilter: (status: string) => myClientStore.setClientStatusFilter(status),
  isLoading: myClientStore.isLoading,
  beginLoading: () => myClientStore.BeginLoading(),
  endLoading: () => myClientStore.EndLoading(),
  setSection: setSection,
  getChildRoute: getChildRoute,
  ClientPerson: ClientPerson,
  ClientAddresses: () => myClientStore.getSection('address')

}

export default clientService
