<template>
    <client-section-list :title="title" :headers="headers" :items="items"/>
</template>

<script setup lang="ts">
import ClientSectionList from "@/components/clients/list/ClientSectionList.vue"
import ccd from "@/stores/clientComponentData";
import clientService from "@/services/clients/ClientService";
const title = ccd.clientComponentData.cc_account.title
const headers=ccd.clientComponentData.cc_account.columns
const items = clientService.ClientCcAccounts()
console.log( "ClientCcAccounts", items)
</script>

<style>
</style>
