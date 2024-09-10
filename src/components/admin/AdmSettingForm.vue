<template>
<v-form>
  <v-card>
    <v-card-title :md-elevation="2">
      Adm Setting
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row v-if="myAdmSetting.id > 0">
          <v-col cols="2" md="4">
            <span class="caption">Id</span>
            <span class="">{{myAdmSetting.id }}</span>
          </v-col>
          <v-col cols="6">
            {{myAdmSetting.prefix}}
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="myAdmSetting.keyname"
              label="Keyname">
            </v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="myAdmSetting.keyvalue"
              label="Keyvalue">
            </v-text-field>
            
          </v-col>
        </v-row><v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="myAdmSetting.display_rank"
              label="Display Rank">
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions md-alignment="right">
      <v-btn @click="saveForm">Save</v-btn>
      <v-btn @click="cancelForm">Cancel</v-btn>
    </v-card-actions>
  </v-card>
  </v-form>
</template>

<script setup lang="ts">
import { ref, reactive, defineEmits } from 'vue'
import commonService from "@/services/commonService";
import type AdmSetting from "@/interfaces/admin/AdmSetting";
import AdmSettings from './AdmSettings.vue';
//  value: "AdmSetting",
const $emit = defineEmits(['saveForm', 'cancel'])
const props = defineProps({
    admSetting: AdmSettings,
  })

const myAdmSetting = ref({} as AdmSetting);
const getAdmSetting = () => {
  myAdmSetting.value = commonService.clone( props.admSetting)
}

getAdmSetting()

const saveForm = () => {
  $emit("saveForm", myAdmSetting.value);
}

const cancelForm = () => {
      $emit("cancel");
}

const created = () => {}

</script>
<style scoped>
</style>