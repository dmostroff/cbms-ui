import apiService from '@/services/apiService'
import type Client from '@/interfaces/clients/Client'
import type ClientPerson from '@/interfaces/clients/ClientPerson'
import clientStore from '@/stores/ClientStore'
import type ClientData from '@/interfaces/clients/ClientData'

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
  // const url = 
  const full_url = `${sectionUrls.client.getUrl}/${client_id}`
  const client = (await apiService.get(full_url)) as Client
  myClientStore.setClient(client)
  console.log("clientService getClient", myClientStore.Client.address, full_url)
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

const getSectionItem = (sectionData: Array<ClientData>, item_id: number): ClientData => {
  try {
    const retVal = sectionData.filter((item: ClientData) => item.id == item_id)
    return (retVal.length == 0) ? { id: -2 } : retVal[0]
  } catch( error) {
    return { id: -1 } as ClientData
  }
}


const getChildRoute = (section: string) => myClientStore.getChildRoute( section)

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
  getChildRoute: getChildRoute,
  Client: () => myClientStore.Client,
  ClientPerson: () => myClientStore.ClientPerson,
  ClientAddresses: () => myClientStore.Client.address,
  ClientCcAccounts: () => myClientStore.Client.cc_account,
  ClientCheckings: () => myClientStore.Client.checking,
  ClientIsraels: () => myClientStore.Client.client_israel,
  ClientCreditLineHistories: () => myClientStore.Client.credit_line_history,
  ClientCreditReports: () => myClientStore.Client.credit_report,
  ClientCreditSummary: () => myClientStore.Client.credit_summary,
  ClientLoans: () => myClientStore.Client.loan,
  getAddress: (id: number) => getSectionItem(myClientStore.Client.address, id),
  getCcAccount: (id: number) => getSectionItem( myClientStore.Client.cc_account, id),
  getChecking: (id: number) => getSectionItem(myClientStore.Client.checking, id),
  getIsraelInfo: (id: number) => getSectionItem(myClientStore.Client.client_israel, id),
  getCreditLineHistory: (id: number) => getSectionItem(myClientStore.Client.credit_line_history, id),
  getCreditReport: (id: number) => getSectionItem(myClientStore.Client.credit_report, id),
  getLoan: (id: number) => getSectionItem(myClientStore.Client.loan, id),
}

export default clientService
