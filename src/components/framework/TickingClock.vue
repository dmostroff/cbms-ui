<template>
  <div>{{ currentTime }} {{ hebrewDate }}</div>
</template>

<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { format } from 'date-fns'

const getCurrentDateTime = () => {
  const today = new Date()
  return format(today, 'PP pp')
}

const HebrewDate = () => {
  const today = new Date()
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: 'numeric'
  }
  return today.toLocaleString('he-u-ca-hebrew', options)
}

const currentTime = ref(getCurrentDateTime())
const hebrewDate = ref(HebrewDate())

const updateClock = () => {
  currentTime.value = getCurrentDateTime()
  requestAnimationFrame(updateClock)
}

requestAnimationFrame(updateClock)

onUnmounted(() => {
  currentTime.value = ''
})
</script>
