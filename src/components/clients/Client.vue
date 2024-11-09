<template>
  <div v-if="clientId>0">
    <div v-for="item in sectionNames" style="display: inline">
      <v-tab :key="item.value" @click="clickSection(item.value)">{{ item.title }} </v-tab>
    </div>
    <ClientPersonHeading :key="clientId" :client_id="clientId"/>
    <v-divider></v-divider>
    <RouterView />
  </div>
  <!-- <v-container>
    <v-row :dense="true">
      <v-col cols="12">
        <span v-for="item in sectionNames">
        <v-tab :key="item.value" @click="clickSection(item.value)">{{ item.title }}
          </v-tab></span>
          </v-col>
    </v-row>
      <ClientPersonHeading />
    <v-divider></v-divider>
    <RouterView />
  </v-container> -->
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
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
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
const clientId = ref(0);
const currentSectionName = ref("");

const getClient = async (id: number) => {
  client.value = await clientService.getClient(id);
  console.log("getClient", client.value);
  // if ( client.value.person && 'id' in client.value.person) {
  //   clientId.value = client.value.person.id
  // }
};

const getSections = () => {
  const sections = ccd.getSectionNames();
  // sections.forEach( (item)=> item.value = `${client.value.person.id}/${item.value}` )
  return sections;
};

const clickSection = (sectionName: string) => {
  currentSectionName.value = sectionName;
  console.log(sectionName, clientId.value);
  router.push({ name: sectionName, params: { client_id: clientId.value } });
};

const sectionNames = getSections();
const isValid = computed(() => {
  return true;
  // return clientPerson; // && 'id' in clientPerson
});

clientId.value = parseInt(route.params.client_id as string);
console.log("Client: client_id", clientId.value);

getClient(clientId.value);
currentSectionName.value = "cc_account";
// go to the cc accounts section first
clickSection(currentSectionName.value);
</script>
