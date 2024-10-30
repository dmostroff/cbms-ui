<template>
    <div>
      <h2>{{ props.title }}</h2>
      <v-data-table
      :headers="props.headers"
      :items="props.items"
      item-key="id"
      items-per-page="5"
    ></v-data-table>
  
    </div>
    
  </template>
  
  <script setup lang="ts">
    const props = defineProps({
  title: { type: String, default: "Client" },
  headers: { tytpe: Object, default: {} },
  items: { type: Array, default: {} }
});
  </script>
  
  <style>
  </style>
  