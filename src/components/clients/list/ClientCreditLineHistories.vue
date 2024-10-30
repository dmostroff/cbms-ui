<template>
      <client-section-list :title="title" :headers="headers" :items="items"/>
</template>

<script setup lang="ts">
import ClientSectionList from "@/components/clients/list/ClientSectionList.vue"
import ccd from "@/stores/clientComponentData";
import clientService from "@/services/clients/ClientService";
const title = ccd.clientComponentData.credit_line_history.title
const headers=ccd.clientComponentData.credit_line_history.columns
const items = clientService.ClientCreditLineHistories()
console.log( "ClientCreditLineHistories", items)
</script>

<style>
</style>
