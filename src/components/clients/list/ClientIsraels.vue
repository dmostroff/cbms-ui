<template>
      <client-section-list :title="title" :headers="headers" :items="items"/>
</template>

<script setup lang="ts">
import ClientSectionList from "@/components/clients/list/ClientSectionList.vue"
import ccd from "@/stores/clientComponentData";
import clientService from "@/services/clients/ClientService";
const title = ccd.clientComponentData.client_israel.title
const headers=ccd.clientComponentData.client_israel.columns
const items = clientService.ClientIsraels()
console.log( "ClientIsrael", items)
</script>

<style>
</style>
