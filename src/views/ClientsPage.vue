<template>
  <div>
    <p>Client Page</p>
    <p>{{ counter }} Loading: {{ isLoading }}</p>
    <v-progress-circular color="primary" size="3em" />
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
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Clients from "@/components/clients/Clients.vue"

import type Client from "@/interfaces/clients/Client";
import clientService from "@/services/clients/ClientService";
import admService from "@/services/admService";
import { formatDate } from "@/services/commonService";
import BreadCrumbs from "@/components/framework/BreadCrumbs.vue";
import AdmSetting from "@/interfaces/admin/AdmSetting";

const router = useRouter();
const counter = ref(0);
const upcount = () => counter.value++;
const isLoading = computed(() => clientService.isLoading);
const errorMessage = ref("");
const selectedRow = ref(0);
const title = "Clients";

const formatDob = (dt: string): string => {
  return formatDate(dt);
};

const formatClientStatus = ( client_status: string): string => {
  return admService.getKeyValue( client_status, clientStatuses)
}

const addClient = (row: Client) => {
  alert(row);
};
</script>
