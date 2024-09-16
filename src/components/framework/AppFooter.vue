<template>
  <v-toolbar class="justify-end items-center">
    <v-toolbar-title class="sm absolute-center text-black" align-end size="">
      {{ copyright }}
    </v-toolbar-title>
    <v-toolbar-items class="xs">
      <v-btn v-for="(item, index) in items" :key="index"  @click="clickitem(item.name)">
        {{ item.label }}
        </v-btn>
      </v-toolbar-items>
      <span size="small">{{  progMode }}</span>
      <v-row>
        <v-col cols="12">
          {{ apiMessage }}
        </v-col>
      </v-row>
  </v-toolbar>

</template>

<script setup lang="ts">
import { computed } from 'vue'
import router from "@/router"
import frameworkService from "@/services/frameworkService"
import apiService from '@/services/apiService';

const progMode = import.meta.env.MODE;
const copyright = "\u00A9 Ostroff Enterprises " + new Date().getFullYear();
const items = frameworkService.menuItem

const clickitem = (name: string) => {
  router.push( { name: name })
}

const apiMessage = computed(() => apiService.getMessage())
</script>

<style>
</style>
