<template>
  <client-section-list :title="title" :headers="headers" :items="items"/>
</template>

<script setup lang="ts">
import ClientSectionList from "@/components/clients/list/ClientSectionList.vue"
import ccd from "@/stores/clientComponentData";
import clientService from "@/services/clients/ClientService";
const title = ccd.clientComponentData.address.title
const headers=ccd.clientComponentData.address.columns
const items = clientService.ClientAddresses()
console.log( "clientAddresses", items)
</script>

<style>
</style>
