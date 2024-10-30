<template>
      <client-section-list :title="title" :headers="headers" :items="items"/>
</template>

<script setup lang="ts">
import ClientSectionList from "@/components/clients/list/ClientSectionList.vue"
import ccd from "@/stores/clientComponentData";
import clientService from "@/services/clients/ClientService";
const title = ccd.clientComponentData.loan.title
const headers=ccd.clientComponentData.loan.columns
const items = clientService.ClientLoans()
console.log( "Loan", items)
</script>

<style>
</style>
