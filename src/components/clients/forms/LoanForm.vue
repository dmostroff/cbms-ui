<template>
  <v-card v-if="myClientLoan">
    <div class="row justify-between items-center">
      <div class="col-2">
        <v-input
          v-model="myClientLoan.xero_id"
          label="Xero Id"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
      <div class="col-2">
        <v-input
          v-model="myClientLoan.first_name"
          label="First Name"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
      <div class="col-3">
        <v-input
          v-model="myClientLoan.last_name"
          label="Last Name"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
      <div class="col-2">
        <v-select
          v-model="myClientLoan.loan_status"
          label="Loan Status"
          :options="loanStatuses"
          map-options
          emit-value
          :readonly="isReadOnly"
        >
        </v-select>
      </div>
    </div>
    <div class="row justify-between items-center">
      <div class="col-2">
        <v-select
          v-model="myClientLoan.card_name"
          :options="myCardStore.CardNames"
          label="Card Name"
          @update:model-value="setCardXeroId"
          :readonly="isReadOnly"
        />
      </div>
      <div class="col-2">
        <v-input
          v-model="myClientLoan.loan_number"
          label="Loan Num"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
      <div class="col-1">
        <v-input
          v-model="myClientLoan.credit_line"
          label="Credit Line"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
      <div class="col-1"></div>
      <div class="col-2">
        <v-input
          v-model="myClientLoan.autopay_account"
          label="Autopay Account"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
    </div>
    <div class="row justify-between items-center">
      <div class="col-2">
        <v-select
          v-model="myClientLoan.device"
          label="Device"
          :options="devices"
          map-options
          emit-value
          :readonly="isReadOnly"
        >
        </v-select>
      </div>
      <div class="col-2">
        <v-input
          v-model="myClientLoan.login"
          label="Login"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
      <div class="col-2">
        <v-input
          v-model="myClientLoan.pwd"
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
      <div class="col-3"></div>
    </div>
    <!-- <div class="row justify-between items-center">
        <div class="col-2">
          <DialogDatePicker
            :date="myClientLoan.open_date"
            tag="open_date"
            label="Open Date"
            @datepicker="datePicker"
            :isReadOnly="isReadOnly"
          ></DialogDatePicker>
        </div>
        <div class="col-2">
          <DialogDatePicker
            :date="myClientLoan.reconciled_on"
            tag="reconciled_on"
            label="Reconciled On"
            @datepicker="datePicker"
            :isReadOnly="isReadOnly"
          ></DialogDatePicker>
        </div>
        <div class="col-2">
          <DialogDatePicker
            :date="myClientLoan.due_on"
            tag="due_on"
            label="Due On"
            @datepicker="datePicker"
            :isReadOnly="isReadOnly"
          ></DialogDatePicker>
        </div>
        <div class="col-2">
          <DialogDatePicker
            :date="myClientLoan.maturity_on"
            tag="maturity_on"
            label="Maturity On"
            @datepicker="datePicker"
            :isReadOnly="isReadOnly"
          ></DialogDatePicker>
        </div>
      </div> -->
    <div class="row justify-between items-center">
      <div class="col-4">
        <v-input
          v-model="myClientLoan.loan_info"
          label="Loan Info"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
    </div>
    <div class="row justify-between items-center">
      <div class="col-4">
        <v-input
          v-model="myClientLoan.notes"
          label="Notes"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
      <div class="col-4">
        <v-input
          v-model="myClientLoan.task"
          label="Task"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { ref, reactive, computed, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ccCardStore } from "@/stores/ccCardStore";
import { clientStore } from "@/stores/clientStore";
import { admStore } from "@/stores/admStore";

const route = useRoute();
const myCardStore = ccCardStore();
const myClientStore = clientStore();
const myAdmStore = admStore();
let myClientLoan = myClientStore.Item;
const isReadOnly = ref(false);
const devices = ref([]);
const loanStatuses = ref([]);
const isValid = computed(() => true);
const isPwd = ref(true);

onMounted(() => {
  devices.value = myAdmStore.PrefixSettingOptions("DEVICE");
  loanStatuses.value = myAdmStore.PrefixSettingOptions("ACCOUNTSTATUS");
});

watch(
  () => route.params.id,
  () => (myClientLoan = myClientStore.Item)
);

const setCardXeroId = () => {
  const card_code = myCardStore.getCardCode(myClientLoan.card_name);
  myClientLoan.xero_id = `8. ${card_code}-${myClientLoan.client_code}`;
};
</script>
<style scoped></style>
