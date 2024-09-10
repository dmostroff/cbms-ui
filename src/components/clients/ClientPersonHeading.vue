<template>
  <div>
    <div class="row full-width" v-if="isValid">
      <div class="col-2 text-subtitle-2">
        Id:{{ clientPerson.id }} Code: {{ clientPerson.client_code }}
      </div>
      <div class="col-8 text-h5">{{ clientPerson.client_name }}</div>
      <div class="col-2">
        <span v-if="clientAge">Age: {{ clientAge }}</span>
      </div>
    </div>
    <div v-else class="text-warning">No person given.</div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { clientStore } from '@/stores/clientStore'
import { getAge } from '@/services/commonService'

const myClientStore = clientStore()
const clientPerson = myClientStore.ClientPerson

const isValid = computed(() => {
  return clientPerson && 'id' in clientPerson
})

const clientAge = computed(() => {
  return clientPerson && 'dob' in clientPerson ? getAge(clientPerson['dob']) : null
})
</script>

<style></style>
