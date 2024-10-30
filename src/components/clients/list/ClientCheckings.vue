<template>
    <client-section-list :title="title" :headers="headers" :items="items"/>
</template>

<script setup lang="ts">
import ClientSectionList from "@/components/clients/list/ClientSectionList.vue"
import ccd from "@/stores/clientComponentData";
import clientService from "@/services/clients/ClientService";
const title = ccd.clientComponentData.checking.title
const headers=ccd.clientComponentData.checking.columns
const items = clientService.ClientCheckings()
console.log( "ClientChecking", items)
</script>

<style>
</style>
