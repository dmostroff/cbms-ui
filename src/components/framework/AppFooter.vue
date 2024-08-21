<template>
  <q-toolbar class="justify-end items-center">
    <q-toolbar-title class="absolute-center text-black">
      {{ copyright }}
    </q-toolbar-title>
    <div>{{ progMode }}</div>
  </q-toolbar>
</template>

<script setup>
const progMode = import.meta.env.MODE;
const copyright = "\u00A9 Ostroff Enterprises " + new Date().getFullYear();
</script>

<style>
</style>
