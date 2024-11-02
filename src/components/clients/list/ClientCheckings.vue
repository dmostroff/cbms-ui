<template>
    <client-section-list :title="title" :headers="headers" :items="items" @selectedItem="getChecking"/>
</template>

<script setup lang="ts">
import ClientSectionList from "@/components/clients/list/ClientSectionList.vue"
import ccd from "@/stores/clientComponentData";
import clientService from "@/services/clients/ClientService";
const title = ccd.clientComponentData.checking.title
const headers=ccd.clientComponentData.checking.columns
const items = clientService.ClientCheckings()
console.log( "ClientChecking", items)
const getChecking = (id) => clientService.getChecking(id)

</script>

<style>
</style>
