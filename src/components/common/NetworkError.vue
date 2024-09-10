<template>
  <v-card>
    <v-card-title>
      <v-alert dense outlined type="error">There has been a Network Error.</v-alert>
    </v-card-title>
    <v-card-text>
      <p>Please check your internet connection. The backend site is not available.</p>
      <v-row v-if="isPing">
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
import { ref, reactive } from 'vue'
import router from '@/router'
// import { useRouter } from 'vue-router'
// import type ApiError from '@/models/common/ApiError'
// import misc from '@/services/MiscService'
import type { ApiResult } from '@/interfaces/common/ApiResponse'
import apiService from '@/services/apiService'

// const router = useRouter()
// const name = 'NetworkError'
const isPing = ref(false)
let pingResponse = reactive({} as ApiResult)

const baseUrl = apiService.getBaseUrl()
const gotologin = () => {
  router.push({ name: 'login' })
}

const ping = async (): Promise<ApiResult> => {
  pingResponse = await apiService.get('ping')
  isPing.value = true
  return pingResponse
}
</script>
