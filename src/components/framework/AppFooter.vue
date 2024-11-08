<template>
  <div>
        <v-toolbar>
          <v-container>
    <v-row class="justify-end items-center">
      <v-col cols="3" class="sm absolute-center text-black">
            {{ copyright }}
            </v-col>
            <v-col cols="8">
              <v-toolbar-items>
              <v-btn
              v-for="(item, index) in items"
              :key="index"
              @click="clickitem(item.name)"
            >
              {{ item.label }}
            </v-btn>
          </v-toolbar-items>
            </v-col>
            <v-col cols="1"><span @click="toggleShowDebug">Debug</span></v-col>
    </v-row></v-container>
            </v-toolbar>
            <v-container v-if="showDebug">
    <v-row>
      <v-col cols="4">
        {{ error }}
        {{ apiMessage }}
      </v-col>
      <v-col cols="6">
        {{ apiError }}
      </v-col>
      <v-col cols="2">
        <span size="small">{{ progMode }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">{{ axiosError }}</v-col>
    </v-row>
  </v-container>
</div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import router from "@/router";
import frameworkService from "@/services/frameworkService";
import apiService from "@/services/apiService";

const progMode = import.meta.env.MODE;
const copyright = "\u00A9 Ostroff Enterprises " + new Date().getFullYear();
const items = frameworkService.menuItem;

const clickitem = (route_name: string) => {
  router.push({ name: route_name });
};

const showDebug = ref(false);
const toggleShowDebug = () => showDebug.value = !showDebug.value;

const apiMessage = computed(() => apiService.getMessage());
const apiError = computed(() => apiService.getApiError());
const error = computed(() => apiService.getError());
const axiosError = computed(() => apiService.getAxiosError())
</script>

<style></style>
