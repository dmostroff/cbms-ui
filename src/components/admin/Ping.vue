<template>
<v-card class="ma-lg">
    <v-card-title background-color="primary">Login</v-card-title>
    <v-card-text>
      {{ pingResult }}
    </v-card-text>
    <v-card-actions>
      <v-btn label="Ping" style="width: 120px" class="bg-primary text-white q-pa-sm" @click="ping"
      color="secondary"
        >Ping</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import type Ping from '@/interfaces/admin/Ping';
import admService from '@/services/admService';
const pingResult = ref('')

const ping = () => {
    pingResult.value = admService.ping() as Ping
}
</script>
