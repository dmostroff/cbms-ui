<template>
  <div>
    <p>Client Page</p>
    <p>{{ counter }} Loading: {{ isLoading }}</p>
    <v-btn primary @click="upcount">Count</v-btn>
    <v-container fluid class="justify-center items-center">
      <div v-if="isLoading">
        Loading...{{ isLoading }}
        <v-progress-circular color="primary" size="3em" />
      </div>
      <div v-else>
        <BreadCrumbs :level="2"></BreadCrumbs>
        <div v-if="errorMessage" class="text-black bg-red-1">
          {{ errorMessage }}
        </div>
        <div>
          <Clients></Clients>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import Clients from "@/components/clients/Clients.vue"

import type Client from "@/interfaces/clients/Client";
import ccd from "@/stores/clientComponentData";
import clientService from "@/services/clients/ClientService";
import admService from "@/services/admService";
import { filterTableRows, formatDate } from "@/services/commonService";
import BreadCrumbs from "@/components/framework/BreadCrumbs.vue";
import AdmSetting from "@/interfaces/admin/AdmSetting";

const router = useRouter();
const counter = ref(0);
const filter = ref(clientService.getClientsFilter());
const upcount = () => counter.value++;
const isLoading = computed(() => clientService.isLoading);
const columns = ccd.clientComponentData.clients.columns;
console.log(columns);
const hasLoadedSettings = computed(() => admService.hasLoadedSettings());
const errorMessage = ref("");
const selectedRow = ref(0);
const title = "Clients";

const rowClick = (item) => {
  clientService.setClientsFilter(filter.value);
  router.push({ name: "client", params: { clientid: item.id } });
};

const deleteRow = (row) => {
  counter.value += 100;
  clientService.deleteClient(0);
};

const filterFunc = (rows, term) => {
  return filterTableRows(rows, term);
};

const formatDob = (dt: string): string => {
  return formatDate(dt);
};

const formatClientStatus = ( client_status: string): string => {
  console.log( client_status)
  return admService.getKeyValue( client_status, clientStatuses)
}

const addClient = (row: Client) => {
  alert(row);
};
</script>
