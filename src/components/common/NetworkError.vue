<template>
  <v-card>
    <v-card-title>
      <v-alert dense outlined type="error">There has been a Network Error.</v-alert>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row><v-col cols="12">
          <p>Please check your internet connection. The backend site is not available.</p>
          <p>{{  lastChecked }}</p>
        </v-col></v-row>
      <v-row v-if="hasPingResonse">
        <v-col cols="2">{{ pingResponse.rc }}</v-col>
        <v-spacer></v-spacer>
        <v-col cols="2">{{ pingResponse.msg }}</v-col>
        <v-spacer></v-spacer> </v-row
      ><v-row>
        <v-col cols="12">{{ pingResponse.data }}</v-col>
      </v-row>
      <v-row>
        <v-alert dense type="info">{{ baseUrl }}</v-alert>
      </v-row>
    </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn class="mx-2" @click="ping">Test Backend</v-btn>
      <v-spacer></v-spacer>
      <div class="subtitle-2 mx-2">Fixed?</div>
      <v-btn class="mx-2" @click="gotologin">Login Again</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import router from '@/router'
// import { useRouter } from 'vue-router'
// import type ApiError from '@/models/common/ApiError'
// import misc from '@/services/MiscService'
import type { ApiResult } from '@/interfaces/common/ApiResponse'
import apiService from '@/services/apiService'

// const router = useRouter()
// const name = 'NetworkError'
const isPing = ref(false)
const pingResponse = ref({} as ApiResult)
const hasPingResonse = computed(() => {
  return ( pingResponse.value && 'rc' in pingResponse.value)
})
const lastChecked = ref('')
const updateLastChecked = () => {
  lastChecked.value = (new Date()).toLocaleString()
}
updateLastChecked()

const baseUrl = apiService.getBaseUrl()
const gotologin = () => {
  updateLastChecked();
  router.push({ name: 'login' })
}

const ping = async (): Promise<ApiResult> => {
  pingResponse.value = await apiService.get('ping')
  isPing.value = true
  updateLastChecked()
  return pingResponse
}
</script>
