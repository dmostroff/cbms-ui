<template>
  <div>
    <v-container>
    <v-icon>mdi-home</v-icon> <!-- Example of using mdi icon -->
    <v-icon>mdi-account</v-icon>
  </v-container>    <!-- Search input -->
    <v-text-field v-model="search" label="Search" class="mb-4" outlined></v-text-field>
    <v-data-table
      item-value="id"
      :title="title"
      :items="clients"
      :headers="columns"
      separator="vertical"
      :loading="isLoading"
      :search="search"
      @click:xxrow="rowClick"
    >
      <template v-slot:no-data>
        <v-alert :value="true" color="warning" icon="warning">
          Sorry, nothing to display here :(
        </v-alert>
      </template>
      <template v-slot:loading>
        <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
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
            <v-icon icon="mdi-account-plus" label="Add" /> Add
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
      <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.id }}</td>
        <td>{{ item.client_code }}</td>
        <td>{{ item.last_name }}</td>
        <td>{{ item.first_name }}</td>
        <td>{{ formatDob(item.dob) }}</td>
        <td>{{ item.email }}</td>
        <td>
        <div class="text-start">{{ formatClientStatus(item.client_status) }}</div>
      </td>
        <td>
          <v-icon class="me-2" size="small" @click="editItem(item)" icon="mdi-pencil"></v-icon>
          <v-icon size="small" @click="deleteItem(item)" icon="mdi-delete"></v-icon>
        </td>
      </tr>
    </template>      
    </v-data-table>
  </div>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import type Client from "@/interfaces/clients/Client";
import type { ClientItem } from "@/interfaces/clients/Client";
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
const filterClientStatus = ref("ACTIVE");
let clientStatuses = [] as AdmSetting[];
const hasLoadedSettings = computed(() => admService.hasLoadedSettings());
const errorMessage = ref("");
const selectedRow = ref(0);
const selectedItem = ref({});
const title = "Clients";

const getClientList = async () => {
  let response = null;
  try {
    clients.value = (await clientService.getClients()) as ClientItem[];
    // console.log(clients.value);
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

const rowClick = (evnt: PointerEvent, rowData: any) => {
  selectedItem.value = rowData.item;
  clientService.setClientsFilter(filter.value);
  console.log(evnt, selectedItem.value);
  //   router.push({ name: "client", params: { clientid: item.id } });
};

const editItem = ( item: ClientItem) => {
  // console.log("Edit Item", item);
  router.push({ name: "client", params: { client_id: item.id } });
}

const deleteItem = (item: ClientItem) => {
  console.log("dELETE", row);
  // clientService.deleteClient(0);
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
};

getData();
</script>
