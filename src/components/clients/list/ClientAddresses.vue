<template>
  <div>
  <client-section-list :title="title" :headers="headers" :items="items" @editItem="editItem" @deleteItem="deleteItem" />
  <div>{{  isActive }}</div>
  <v-dialog activator="parent"  class="pa-4 text-center">

  <template v-slot:default="{ isActive }">
    <address-form :clientAddress="clientAddress"/>
        <v-btn
          text="Close Dialog"
          @click="closeDialog"
        ></v-btn>
  </template>
</v-dialog>
</div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import ClientSectionList from "@/components/clients/list/ClientSectionList.vue"
import ccd from "@/stores/clientComponentData";
import clientService from "@/services/clients/ClientService";
import ClientData from "@/interfaces/clients/ClientData";
import AddressForm from "../forms/AddressForm.vue";
const isActive = ref(false)
const title = ccd.clientComponentData.address.title
const headers=ccd.clientComponentData.address.columns
const items = clientService.ClientAddresses()
const clientAddress = ref( {})
console.log( "clientAddresses", items)

const editItem = ( item: ClientData) => {
  clientAddress.value = item;
  isActive.value = true
}
const deleteItem = ( item: ClientData) => {
  alert("Delete?!")
  isActive.value = true
}

const closeDialog = () => {
  isActive.value = false
}
</script>

<style>
</style>
