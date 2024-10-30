<template>
      <client-section-list :title="title" :headers="headers" :items="items"/>
</template>

<script setup lang="ts">
import ClientSectionList from "@/components/clients/list/ClientSectionList.vue"
import ccd from "@/stores/clientComponentData";
import clientService from "@/services/clients/ClientService";
const title = ccd.clientComponentData.credit_report.title
const headers=ccd.clientComponentData.credit_report.columns
const items = clientService.ClientCreditReports()
console.log( "ClientCreditReports", items)
</script>

<style>
</style>
