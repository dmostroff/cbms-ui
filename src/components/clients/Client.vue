<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <span v-for="item in sectionNames">
        <v-tab :key="item.value" :to="item.value">{{ item.title }}
          </v-tab></span>
          </v-col>
    </v-row>
    <v-row>
      <ClientPersonHeading />
    <v-divider></v-divider>
    <RouterView />
    </v-row>
  </v-container>
    <!-- Frank{{ sectionNames }}!
    <div>
      <v-select
        :items="sectionNames"
        item-title="title"
        item-value="value"
        label="Section"
        single-line
      ></v-select>
    </div> -->
</template>
<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRoute } from "vue-router";
import clientService from "@/services/clients/ClientService";
import {
  getAge,
  isValidZip,
  formatPhone,
  formatCurrency,
  formatDate,
} from "@/services/commonService";
import type Client from "@/interfaces/clients/Client";
import ClientPersonHeading from "@/components/clients/ClientPersonHeading.vue";
import ccd from "@/stores/clientComponentData";
const route = useRoute();
const client = ref({} as Client);
const sectionNames = ccd.getSectionNames();

const getClient = async (id: number) => {
  client.value = await clientService.getClient(id);
};

const getSections = () => {
  const sections = ccd.getSectionNames();
};

const isValid = computed(() => {
  return true;
  // return clientPerson; // && 'id' in clientPerson
});

const client_id = parseInt(route.params.client_id as string);
getClient(client_id);
</script>
