<script setup lang="ts">
import { useRouter } from 'vue-router'
// import AppTopBar from '@/components/framework/AppTopBar.vue'

const router = useRouter()
// import router from '@/router'
const app_version = import.meta.env.VITE_APP_VERSION
const app_title = import.meta.env.VITE_APP_TITLE
// router.push({ name: 'login' })
</script>

<template>
  <main>
    <h1>{{ app_version }} {{ app_title }}</h1>
    <!-- <AppTopBar /> -->
  </main>
</template>
