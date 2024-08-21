<template>
  <div class="modal">
    <v-container class="text-center">
      <v-row class="h4">
        <v-col>{{ title }}</v-col>
      </v-row>
      <v-row align-self-center class="primary display-2 pa-4 text-center rounded-xl">
        <v-col>{{ prompt }}</v-col>
      </v-row>
      <v-row v-if="ask_areyousure && !areyousure" align-self-center class="subtitle">
        <v-col>Are you sure?</v-col>
      </v-row>
      <v-row align-self-end>
        <v-col>
          <v-btn class="mt-3 border-b border-teal font-semibold" @click="confirmed">OK</v-btn>
        </v-col>
        <v-col align-self-end>
          <v-btn class="mt-3 border-b border-teal font-semibold" @click="close">Cancel</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits(['confirmed', 'close'])
interface Props {
  // item: Object,
  title?: string
  prompt: string
  ask_areyousure?: boolean
}
const props = defineProps<Props>()

const dialog = ref(false)
const ask_areyousure = props.ask_areyousure ?? false
const title = props.title ?? 'Confirm'
const prompt = props.prompt
const areyousure = ref(!ask_areyousure)

const confirmed = () => {
  if (areyousure.value) {
    dialog.value = true
    emits('confirmed')
  } else {
    areyousure.value = true
  }
}

const close = () => {
  dialog.value = false
  emits('close')
}
</script>
<style lang="css" scoped>
.modal {
  background-color: rgb(227, 249, 255);
}
</style>
