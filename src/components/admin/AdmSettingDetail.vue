<template>
  <v-card>
    <v-card-title :md-elevation="2">
      Adm Setting
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col><span class="subtitle-2">Id</span>: 
            {{admSetting.id}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Prefix</span>: 
            {{admSetting.prefix}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Keyname</span>: 
            {{admSetting.keyname}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Keyvalue</span>: 
            {{admSetting.keyvalue}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Display Rank</span>: 
            {{admSetting.display_rank}}
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions md-alignment="right">
      <v-btn @click="editForm">Edit</v-btn>
      <v-btn @click="cancelForm">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
const $emit = defineEmits(['editForm', 'cancel'])

// const name ="AdmSetting"
const props = defineProps({
  admSetting: {
    type: Object,
    default: {}
  })

const editForm = () => {
      $emit( "editForm" )
    }
const cancelForm = () => {
      $emit( "cancel" )
}
const created = () => {}
</script>
<style scoped>
</style>