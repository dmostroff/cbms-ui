<template>
  <v-container>
    <v-row class="text-h5" v-if="isValid">
      <v-col cols="10">{{ clientPerson.client_name }}</v-col>
      <v-col cols="2">
        <span v-if="clientAge">Age: {{ clientAge }}</span>
      </v-col>
    </v-row>
    <v-row v-if="isValid">
      <v-col cols="12">
        <span class="text-subtitle">Id: </span
        ><span>{{ clientPerson.id }}</span> &nbsp;<span class="text-caption">Code: </span
        ><span>{{ clientPerson.client_code }}</span> &nbsp;<span class="text-caption"
          >DOB: </span
        ><span>{{ formatDate(clientPerson.dob) }}</span> &nbsp;<span class="text-caption"
          >Status: </span
        ><span>{{ clientPerson.client_status }}</span> &nbsp;<span class="text-caption"
          >Email:</span
        ><span>{{ clientPerson.email }}</span> &nbsp;<span class="text-caption">
          Pwd: </span
        ><span>{{ clientPerson.pwd }}</span> &nbsp;<span class="text-caption">MMN:</span
        ><span>{{ clientPerson.mmn }}</span>
      </v-col>
    </v-row>
    <v-row v-if="isValid">
      <v-col cols="12">
        <span class="text-caption">Phone: </span
        ><span>{{ formatPhone(clientPerson.phone) }}</span> &nbsp;<span
          v-if="clientPerson.phone2"
          class="text-caption"
          >Phone 2:</span
        >
        <span v-if="clientPerson.phone2">{{ formatPhone(clientPerson.phone2) }}</span>
        &nbsp;<span v-if="clientPerson.occupation>''" class="text-caption">Occupation: </span>
        <span v-if="clientPerson.occupation>''">{{ clientPerson.occupation }}</span>
        &nbsp;<span v-if="clientPerson.employer>''" class="text-caption" >Employer: </span>
        <span v-if="clientPerson.employer>''">{{ clientPerson.employer }}</span> 
        &nbsp;<span v-if="clientPerson.income>''" class="text-caption">Income: </span>
        <span v-if="clientPerson.income>''">{{ formatCurrency(clientPerson.income) }}</span>
        &nbsp;<span v-if="clientPerson.tax_status>''" class="text-caption">Tax Status: </span>
        <span v-if="clientPerson.tax_status>''">{{ clientPerson.tax_status }}</span>
      </v-col>
    </v-row>
    <v-row v-if="isValid">
      <v-col cols="12">{{ clientPerson }}</v-col>
    </v-row>
    <!-- <v-row v-for="address in client.address">
      <v-col cols="3">{{ address.street_address }}</v-col>
      <v-col cols="3" class="text-caption">{{ address.city }}</v-col>
    </v-row>
    <v-row v-if="false"
      ><v-col>{{ clientPerson }}-{{ client_id }}</v-col></v-row
    > -->
    <v-row v-if="!isValid">
      <v-col cols="12" class="text-warning">No person given.</v-col>
    </v-row>
  </v-container>
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
import type ClientPerson from "@/interfaces/clients/ClientPerson";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
const route = useRoute();
const client = ref({} as Client);
const clientPerson = ref({} as ClientPerson);

const getClient = async (id: number) => {
  client.value = await clientService.getClient(id);
  clientPerson.value = client.value.person;
  console.log(clientPerson);
};

const isValid = computed(() => {
  return true;
  // return clientPerson; // && 'id' in clientPerson
});

const clientAge = computed(() => {
  return clientPerson.value && "dob" in clientPerson.value
    ? getAge(clientPerson.value["dob"])
    : null;
});

const client_id = parseInt(route.params.client_id as string);
getClient(client_id);
console.log(clientPerson.value);
</script>

<style></style>
export default { name: 'ClientPersonHeading', // other options... };
