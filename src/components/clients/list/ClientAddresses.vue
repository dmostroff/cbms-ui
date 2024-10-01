<template>
<v-data-table
    :headers="headers"
    :items="items"
    item-key="id"
    items-per-page="5"
  ></v-data-table>
  
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";
import { ref } from "vue";
import ccd from "@/stores/clientComponentData";
import clientService from "@/services/clients/ClientService";
const headers=ccd.clientComponentData.address.columns
const items = clientService.ClientAddresses()
</script>

<style>
</style>
