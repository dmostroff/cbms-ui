<script setup lang="ts">
import { useRouter } from 'vue-router'
// import AppTopBar from '@/components/framework/AppTopBar.vue'

const router = useRouter()
// import router from '@/router'
const app_version = import.meta.env.VITE_APP_VERSION
router.push({ name: 'login' })
</script>

<template>
  <main>
    <h1>{{ app_version }} Joe Biden</h1>
    <!-- <AppTopBar /> -->
  </main>
</template>
