<template>
  <div>
  <client-section-list :title="title" :headers="headers" :items="items" @editItem="editItem" @deleteItem="deleteItem" />
  <div>{{  isActive }}</div>
  <v-dialog v-model="isActive" class="pa-4 text-center">

  <template v-slot:default="{ isActive }">
    <address-form :clientAddress="clientAddress"/>
        <v-btn
          text="Save"
          @click="save"
        ></v-btn>
        <v-btn
          text="Cancel"
          @click="cancel"
        ></v-btn>
  </template>
</v-dialog>
</div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import ClientSectionList from "@/components/clients/list/ClientSectionList.vue"
import ccd from "@/stores/clientComponentData";
import commonService from "@/services/commonService";
import clientService from "@/services/clients/ClientService";
import ClientData from "@/interfaces/clients/ClientData";
import AddressForm from "../forms/AddressForm.vue";
const isActive = ref(false)
const title = ccd.clientComponentData.address.title
const headers=ccd.clientComponentData.address.columns
const items = clientService.ClientAddresses()
const clientAddress = ref( {})
const prevClientAddress = ref({})
console.log( "clientAddresses", items)

const editItem = ( item: ClientData) => {
  clientAddress.value = commonService.clone(item);
  prevClientAddress.value = item;
  isActive.value = true
}
const deleteItem = ( item: ClientData) => {
  alert("Delete?!")
  isActive.value = true
}

const save = () => {
  // prevClientAddress.value.state = clientAddress.value.state;
  Object.keys(prevClientAddress.value).forEach( k => prevClientAddress.value[k] = clientAddress.value[k])
  isActive.value = false
}

const cancel = () => {
  isActive.value = false
}
</script>

<style>
</style>
