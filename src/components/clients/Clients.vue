<template>
  <div>
    <!-- Search input -->
    <v-text-field v-model="search" label="Search" class="mb-4" outlined></v-text-field>
    <v-data-table
      item-value="selectedRow"
      :title="title"
      :items="clients"
      :headers="columns"
      separator="vertical"
      :loading="isLoading"
      :search="search"
      @click:row="rowClick"
    >
      <!-- 
            row-key="" 
            :filter="filter"
            :filter-method="filterFunc"
            -->
      <template v-slot:no-data>
        <v-alert :value="true" color="error" icon="warning">
          Sorry, nothing to display here :(
        </v-alert>
      </template>
      <template v-slot:top>
        <v-row class="justify-start items-center full-width">
          <v-col class="col-2 text-h4">
            <v-icon
              name="refresh"
              size="sm"
              label="Refresh"
              @click="getClientList"
            ></v-icon>
            <span class="mx-sm">{{ title }}</span>
          </v-col>
          <v-col><v-spacer /></v-col>
          <v-col class="col-1" @click="addClient">
            <v-icon name="add_circle" label="Add" /> Add
          </v-col>
          <v-input v-model="filter" label="Filter" class="col-3" clearable></v-input>
          <v-select
            class="col-2 mx-md"
            :items="clientStatuses"
            item-title="keyvalue"
            item-value="keyname"
            map-options
            emit-value
            label="Status"
            @update:modelValue="filterCardStatusChange"
          />
          <!-- :item-value="filterClientStatus" -->
        </v-row>
      </template>
      <!-- Align ID column data to the left -->
      <template #item.id="{ item }">
        <div class="text-start">{{ item.id }}</div>
      </template>
      <!-- Client Code -->
      <template #item.client_code="{ item }">
        <div class="text-start">{{ item.client_code }}</div>
      </template>
      <!-- Last Name -->
      <template #item.last_name="{ item }">
        <div class="text-start">{{ item.last_name }}</div>
      </template>
      <!-- First Name -->
      <template #item.first_name="{ item }">
        <div class="text-start">{{ item.first_name }}</div>
      </template>
      <!-- DOB -->
      <template #item.dob="{ item }">
        <span>{{ formatDob(item.dob) }}</span>
      </template>
      <!-- Email -->
      <template #item.email="{ item }">
        <div class="text-start">{{ item.email }}</div>
      </template>
      <!-- Align ID column data to the left -->
      <template #item.client_status="{ item }">
        <div class="text-start">{{ formatClientStatus(item.client_status) }}</div>
      </template>
      <!-- <template v-slot:body="props">
              <v-col :props="props">
                <v-icon name="edit" @click="rowClick(props)" class="mx-md" />
                <v-icon name="delete" @click="deleteRow(props)" class="mx-md" />
              </v-col>
            </template> -->
    </v-data-table>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import type Client from "@/interfaces/clients/Client";
import ccd from "@/stores/clientComponentData";
import clientService from "@/services/clients/ClientService";
import admService from "@/services/admService";
import { filterTableRows, formatDate } from "@/services/commonService";
import AdmSetting from "@/interfaces/admin/AdmSetting";

const router = useRouter();
const counter = ref(0);
const filter = ref(clientService.getClientsFilter());
const search = ref("");
const upcount = () => counter.value++;
const isLoading = computed(() => clientService.isLoading);
const clients = ref([] as Client[]);
const columns = ccd.clientComponentData.clients.columns;
console.log(columns);
const filterClientStatus = ref("ACTIVE");
let clientStatuses = [] as AdmSetting[];
const hasLoadedSettings = computed(() => admService.hasLoadedSettings());
const errorMessage = ref("");
const selectedRow = ref(0);
const title = "Clients";

const getClientList = async () => {
  let response = null;
  try {
    clients.value = (await clientService.getClients()) as Client[];
    // console.log(clients.value);
    // console.log(columns);
  } catch (error) {
    console.error(error);
    // errorMessage.value = error
    // setTimeout(() => goLogin(), 1000)
  }
};

const getClientStatuses = async () => {
  if (!hasLoadedSettings.value) {
    const response = await admService.getSettings();
  }
  clientStatuses = admService.getSettingsByPrefix("CLIENTSTATUS");
};

const rowClick = (item) => {
  clientService.setClientsFilter(filter.value);
  console.log(item);
  //   router.push({ name: "client", params: { clientid: item.id } });
};

const deleteRow = (row) => {
  clientService.deleteClient(0);
};

const filterCardStatusChange = (newval: string) => {
  // alert(filterClientStatus.value + ":" + newval);
  clientService.setClientStatusFilter(newval);
  // clients.value = filterFunc(myClientStore.Clients, newval)
};

const filterFunc = (rows, term) => {
  return filterTableRows(rows, term);
};

const formatDob = (dt: string): string => {
  return formatDate(dt);
};

const formatClientStatus = (client_status: string): string => {
  console.log(client_status);
  return admService.getKeyValue(client_status, clientStatuses);
};

const addClient = (row: Client) => {
  alert(row);
};

const getData = () => {
  clientService.beginLoading();
  getClientList();
  getClientStatuses();
  clientService.endLoading();

}

getData()

</script>
