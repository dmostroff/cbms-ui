<template>
  <v-card>
    <div class="row justify-between items-center">
      <div class="col-6">
        <v-input
          v-model="myCreditReport.credit_bureau"
          label="Credit Bureau"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
      <div class="col"></div>
    </div>
    <div class="row justify-between items-center">
      <div class="col-3">
        <v-input
          v-model="myCreditReport.login"
          label="Login"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
      <div class="col-3">
        <v-input
          v-model="myCreditReport.pwd"
          :type="isPwd ? 'password' : 'text'"
          label="Password"
          :readonly="isReadOnly"
        >
          <template v-slot:append>
            <v-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </v-input>
      </div>
      <div class="col-3">
        <v-input
          v-model="myCreditReport.pin"
          label="Pin"
          :readonly="isReadOnly"
          mask="####"
        >
        </v-input>
      </div>
      <!-- </div><div class="row justify-between items-center">
            <div class="col-4">
              <v-input
                v-model="myCreditReport.notes"
                label="Notes"
                :readonly="isReadOnly"
              >
              </v-input>
            </div>
            <div class="col-4">
              <v-input
                v-model="myCreditReport.task"
                label="Task"
                :readonly="isReadOnly"
              >
              </v-input>
            </div> -->
    </div>
  </v-card>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { clientStore } from "@/stores/clientStore";

const route = useRoute();
const myClientStore = clientStore();
let myCreditReport = myClientStore.Item;
const isReadOnly = ref(false);
const isPwd = ref(true);

watch(
  () => route.params.id,
  () => (myCreditReport = myClientStore.Item)
);

onMounted(() => {});
</script>
<style scoped></style>
