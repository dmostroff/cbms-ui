import { defineStore, type StateTree } from 'pinia'
import type Client from '@/interfaces/clients/Client'
import ClientModel from '@/models/clients/ClientModel'
import type ClientPerson from '@/interfaces/clients/ClientPerson'
import type ClientData from '@/interfaces/clients/ClientData'

const sectionNames = [
  'person',
  'credit_summary',
  'address',
  'client_israel',
  'cc_account',
  'loan',
  'credit_report',
  'checking',
  'credit_line_history'
]

const clientStore = defineStore('clientStore', {
  state: () => ({
    sectionName: 'person',
    sectionTitle: null as string | null,
    client: {} as Client,
    clients: [] as Client[],
    clientsFilter: '',
    clientStatusFilter: 'ACTIVE',
    sectionFilter: {} as { [key: string]: string },
    loading: false,
    error: null as string | null,
    item: {} as Record<string, any>,
    itemIsValid: null as boolean | null,
    searchValue: '' as string,
  }),
  getters: {
    IsLoading: ( state: StateTree) => state.loading,
    Clients: (state: StateTree) => state.clients,
    ClientsFilter: (state: StateTree) => state.clientsFilter,
    ClientStatusFilter: (state: StateTree) => state.clientStatusFilter,
    Client: (state: StateTree) => state.client,
    ClientPerson: (state: StateTree) =>
      state.client && 'person' in state.client ? state.client.person : null,
    CreditSummary: (state: StateTree) =>
      state.client && 'credit_summary' in state.client ? state.client.credit_summary : null,
    CurrentSection: (state: StateTree) => {
      if (state.sectionName == 'clients') {
        return state.clients
      } else {
        return typeof state.client == 'object' && sectionNames.includes(state.sectionName)
          ? state.client[state.sectionName]
          : []
      }
    },
    FirstItemId: (state: StateTree) => {
      const section = getSection(state)
      return section && section.length > 0 && typeof section[0] == 'object' && 'id' in section[0]
        ? section[0].id
        : 0
    },
    Item: (state: StateTree) => state.item,
    ItemById: (state: StateTree) => {
      const section = getSection(state)
      return (id: number) => section.find((item: { id: number }) => item.id === id)
    },
    ItemIsValid: (state: StateTree) => {
      return typeof state.item.isValid == 'function' ? state.item.isValid() : null
    },
    SectionName: (state: StateTree) => state.sectionName,
    SectionFilter: (state: StateTree) => {
      return state.sectionName in state.sectionFilter ? state.sectionFilter[state.sectionName] : ''
    },
    SectionTitle: (state: StateTree) => state.sectionTitle,
    Filters: (state: StateTree) => {
      return Object.entries(state.sectionFilter)
        .map(([k, v]) => k + ':' + v)
        .join('~')
    },
    SearchValue: (state: StateTree) => state.searchValue
  },
  actions: {
    BeginLoading() {
      this.loading = true
    },
    EndLoading() {
      this.loading = false
    },
    HasClients() {
      return this.clients && Array.isArray(this.clients) && this.clients.length > 0
    },
    // async getClients() {
    //   const resp = await api.get('clients');
    //   const cbmsResp = api.requestResponse();
    //   this.clients = cbmsResp.data;
    //   return this.clients;
    // },
    // async getClientsIfEmpty() {
    //   if (this.clients.length === 0) {
    //     const resp = await api.get('clients');
    //     const cbmsResp = api.requestResponse();
    //     this.clients = cbmsResp.data;
    //   }
    //   return this.clients;
    // },
    // async getClient(client_id: number) {
    //   const resp = await api.get('client/' + client_id);
    //   const cbmsResp = api.requestResponse();
    //   this.client = ClientModel.sanitizeData(cbmsResp.data);
    //   return this.client;
    // },
    setClient(clientData: Client) {
      this.client = clientData
    },
    setClients(clients: Client[]) {
      this.clients = clients
    },
    setClientsFilter(filter: string) {
      this.clientsFilter = filter
    },
    setClientStatusFilter(filter: string) {
      this.clientStatusFilter = filter
    },
    setClientPerson(clientPerson: ClientPerson) {
      this.client.person = clientPerson
    },
    setSection(sectionName: string) {
      this.sectionName = sectionNames.includes(sectionName) ? sectionName : 'person'
      console.log(sectionName, this.sectionName)
    },
    setSectionFilter(filter: string) {
      this.sectionFilter[this.sectionName] = filter
    },
    setSectionTitle(title: string) {
      this.sectionTitle = title
    },
    setItemById(id: number) {
      console.info('Begin setItemById', id)
      this.item = {}
      if (this.sectionName in this.client) {
        const itemFound = this.client[this.sectionName].find(
          (item: { id: number }) => item.id === id
        )
        if (itemFound !== undefined) {
          this.item = ClientModel.getClientSectionDataItem(
            this.sectionName,
            itemFound ? itemFound : this.ClientPerson
          )
        }
        if (Object.keys(this.item).length == 0) {
          this.item = ClientModel.newClientDataItem(this.sectionName, this.ClientPerson)
        }
        console.log('Item', this.item)
      } else {
        console.error('No section name')
        throw new Error('no section name')
      }
    },
    getNewClientItem() {
      return ClientModel.newClientDataItem(this.sectionName, this.ClientPerson)
    },
    setItem(item: Record<string, any>) {
      this.item = ClientModel.getClientSectionDataItem(this.sectionName, item)
    },
    setIsValid(isValidFunc: () => boolean) {
      this.itemIsValid = isValidFunc()
    },
    updateClientList(clientPerson: ClientPerson) {
      const client = this.clients.find((item: Client) => item.person.id == clientPerson.id)
      if (client) {
        Object.assign(client, clientPerson)
      }
    },
    deleteClient(id: number) {
      return id
    },
    getSection(state: StateTree): any[] {
      return typeof state.client == 'object' && sectionNames.includes(state.sectionName)
        ? state.client[state.sectionName]
        : []
    },
    setSearchValue( search: string) {
      this.searchValue = search;
    }
    
    // async savePerson(clientPerson: ClientPersonModel) {
    //   const clientPersonData = clientPerson.to_data();
    //   console.log(clientPersonData);
    //   const resp = await api.post('client/person/' + clientPersonData.id, clientPersonData);
    //   const cbmsResp = api.requestResponse();
    //   this.client.person = cbmsResp.data;
    //   return ClientModel.getClientSectionDataItem('person', this.client.person);
    // },
    // async saveData(postUrl: string, item: Record<string, any>) {
    //   const resp = await api.post(postUrl, item);
    //   const cbmsResp = api.requestResponse();
    //   return cbmsResp.data;
    // },
    // async deleteData(url: string, id: number) {
    //   const resp = await api.delete(url + '/' + id);
    //   const cbmsResp = api.requestResponse();
    //   return cbmsResp.data;
    // },
    // async deleteClient(id: number) {
    //   const resp = await this.deleteData('client/person', id);
    //   return resp;
    // },
  }
})

function getSection(state: StateTree): any[] {
  return typeof state.client == 'object' && sectionNames.includes(state.sectionName)
    ? state.client[state.sectionName]
    : []
}

export default clientStore
