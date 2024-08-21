<template>
  <div>
    <p>Client Page</p>
    <p>{{ counter }}</p>
    <v-btn primary @click="upcount">Count</v-btn>
    <v-container fluid class="justify-center items-center">
      <div v-if="isLoading">
        Loading...
        <v-progress-circular color="primary" size="3em" />
      </div>
      <div v-else>
        <BreadCrumbs :level="2"></BreadCrumbs>
        <div v-if="errorMessage" class="text-black bg-red-1">
          {{ errorMessage }}
        </div>
        <div>
          <v-data-table
            v-model="selectedRow"
            :title="title"
            :items="clients"
            :headers="columns"
            :filter="filter"
            :filter-method="filterFunc"
            row-key="id"
            :loading="isLoading"
            separator="vertical"
            :pagination="pagination"
          >
            <!-- @row-click="rowclick" -->
            <template v-slot:top>
              <v-row class="justify-start items-center full-width">
                <v-col class="col-2 text-h4">
                  <v-icon name="refresh" size="sm" label="Refresh" @click="getClientList"></v-icon>
                  <span class="mx-sm">{{ title }}</span>
                </v-col>
                <v-col><v-spacer /></v-col>
                <v-col class="col-1" @click="addClient">
                  <v-icon name="add_circle" label="Add" /> Add
                </v-col>
                <v-input v-model="filter" label="Filter" class="col-3" clearable></v-input>
                <v-select
                  class="col-2 mx-md"
                  :item-value="filterClientStatus"
                  :items="clientStatuses"
                  map-options
                  emit-value
                  label="Status"
                  @update:modelValue="filterCardStatusChange"
                />
              </v-row>
            </template>
            <template v-slot:body="props">
              <v-col :props="props">
                <v-icon name="edit" @click="rowClick(props)" class="mx-md" />
                <v-icon name="delete" @click="deleteRow(props)" class="mx-md" />
              </v-col>
            </template>
          </v-data-table>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

import ccd from '@/stores/ClientComponentData'
import clientService from '@/services/clients/ClientService'
import admService from '@/services/AdmService'
import { filterTableRows } from '@/services/CommonService'

const router = useRouter()
const counter = ref(0)
const filter = ref(clientService.getClientsFilter())
const upcount = () => counter.value++
const isLoading = ref(false)
const clients = ref({})
const columns = ccd.clientComponentData.clients.columns
const filterClientStatus = ref('ACTIVE')
const clientStatuses = ref({})
const hasLoadedSettings = computed(() => admService.hasLoadedSettings())
const errorMessage = ref('')

const getClientList = async () => {
  isLoading.value = true
  let response = null
  try {
    response = await clientService.getClients()
    clients.value = response
    console.log(clients.value)
    isLoading.value = false
  } catch (error) {
    console.error(error)
    // errorMessage.value = error
    // setTimeout(() => goLogin(), 1000)
  }
}

const getClientStatuses = async () => {
  if (!hasLoadedSettings.value) {
    const response = await admService.getSettings()
  }
  clientStatuses.value = admService.getSettingsByPrefix('CLIENTSTATUS')
}

const rowClick = (item) => {
  clientService.setClientsFilter(filter.value)
  router.push({ name: 'client', params: { clientid: item.id } })
}

const deleteRow = (row) => {
  counter.value += 100
  clientService.deleteClient(0)
}

const filterCardStatusChange = (newval: string) => {
  // alert(filterClientStatus.value + ":" + newval);
  clientService.setClientStatusFilter(newval)
  // clients.value = filterFunc(myClientStore.Clients, newval)
}

const filterFunc = (rows, term) => {
  return filterTableRows(rows, term)
}

getClientList()
getClientStatuses()
</script>
