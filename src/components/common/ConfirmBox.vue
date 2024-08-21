<template>
  <v-dialog v-model="dialog">
    <v-card class="v-pa-md">
      <v-card-title class="justify-center">
        <v-banner class="bg-primary text-white">
          {{ msgBox.title }}
        </v-banner>
      </v-card-title>
      <v-card-item class="justify-center text-body1" v-if="msgBox.prompt">
        {{ msgBox.prompt }}
      </v-card-item>
      <v-card-item class="justify-center" v-if="msgBox.message">
        {{ msgBox.message }}
      </v-card-item>
      <v-card-item class="text-subtitle2 text-center" v-if="msgBox.areyousure">
        Are you sure?
      </v-card-item>
      <v-card-actions class="justify-center">
        <v-divider />
        <v-btn label="OK" class="primary mx-lg" @click="confirmed"></v-btn>
        <v-btn label="Cancel" class="secondary mx-lg" @click="close"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import type MsgBox from '@/interfaces/common/MsgBox'
const emits = defineEmits(['confirmed', 'close'])
const props = defineProps<MsgBox>()
const dialog = ref(false)
const msgBox = <MsgBox>{
  title: props.title ?? 'Confirm',
  prompt: props.prompt ?? '',
  message: props.message ?? 'OK/Cancel',
  areyousure: props.areyousure ?? false
}

const confirmed = () => {
  dialog.value = false
  emits('confirmed')
}

const close = () => {
  dialog.value = false
  emits('close')
}
</script>

<style></style>
