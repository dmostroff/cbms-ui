<template>
  <v-card>
    <div class="row">
      <div class="col">
        {{ myClientIsrael }}
      </div>
    </div>
    <div class="row justify-between items-center">
      <div class="col-2">
        <v-input
          v-model="myClientIsrael.bank"
          label="Bank"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
      <div class="col-2">
        <v-input
          v-model="myClientIsrael.branch"
          label="Branch"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
      <div class="col-2">
        <v-input
          v-model="myClientIsrael.account"
          label="Account #"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
    </div>
    <div class="row justify-between items-center">
      <div class="col-3">
        <v-input
          v-model="myClientIsrael.iban"
          label="IBAN"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
      <div class="col-3">
        <v-input
          v-model="myClientIsrael.iban_name"
          label="IBAN Name"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
    </div>
    <div class="row justify-between items-center">
      <div class="col-3">
        <v-input
          v-model="myClientIsrael.address"
          label="Address"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
      <div class="col-2">
        <v-input
          v-model="myClientIsrael.city"
          label="City"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
      <div class="col-1">
        <v-input
          v-model="myClientIsrael.zip"
          label="Zip"
          :readonly="isReadOnly"
          type="text"
          mask="#######"
        >
        </v-input>
      </div>
      <div class="col-2">
        <v-input
          v-model="myClientIsrael.phone"
          label="Phone"
          :readonly="isReadOnly"
          type="text"
          mask="###-###-####"
        >
        </v-input>
      </div>
      <div v-if="false" class="col-4">
        <v-input
          v-model="myClientIsrael.notes"
          label="Notes"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { clientStore } from "@/stores/clientStore";
import { admStore } from "@/stores/admStore";
import commonService from "@/services/commonService";

const route = useRoute();
const myClientStore = clientStore();
let myClientIsrael = myClientStore.Item;
const isReadOnly = ref(false);

watch(
  () => route.params.id,
  () => {
    myClientIsrael = myClientStore.Item;
    console.log(myClientIsrael);
  }
);

onMounted(() => {});
</script>
