<template>
  <v-card>
    <div class="row justify-between items-center">
      <div class="col-2">
        <!-- should be drop down -->
        <v-input
          v-model="myCreditLineHistory.xero_id"
          label="Xero ID"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
      <div class="col-2">
        <!-- <DialogDatePicker
              :date="myCreditLineHistory.cl_date"
              label="Date"
              tag="cl_date"
              @datepicker="datePicker"
              :isReadOnly="isReadOnly"
            ></DialogDatePicker> -->
      </div>
      <div class="col-2">
        <v-input
          v-model="myCreditLineHistory.amount"
          label="Amount"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
      <div class="col-2">
        <v-select
          v-model="myCreditLineHistory.cl_stattus"
          :options="creditLineHistoryStatuses"
          map-options
          emit-value
          label="Status"
          :readonly="isReadOnly"
        >
        </v-select>
      </div>
    </div>
    <div class="row justify-between items-center">
      <div class="col-3">
        <v-input
          v-model="myCreditLineHistory.notes"
          label="Notes"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
      <div class="col-3"></div>
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
let myCreditLineHistory = myClientStore.Item;
const isReadOnly = ref(false);
const creditLineHistoryStatuses = admStore().PrefixSettingOptions("CARDSTATUS");

watch(
  () => route.params.id,
  () => (myCreditLineHistory = myClientStore.Item)
);

onMounted(() => {});
</script>
