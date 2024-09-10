<template>
  <v-card>
    <div class="row justify-between items-center">
      <div class="col-2">
        <v-input v-model="myChecking.xero_id" label="Xero Id" :readonly="true">
        </v-input>
      </div>
      <div class="col-2">
        <v-toggle
          v-model="myChecking.xero_main"
          label="Xero Main"
          :readonly="isReadOnly"
        ></v-toggle>
      </div>
      <div class="col-4">
        <v-input
          v-model="myChecking.name_on_account"
          label="Name on Account"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
    </div>
    <div class="row justify-between items-center">
      <div class="col-3">
        <v-select
          v-model="bankCode"
          label="Bank"
          :options="banks"
          map-options
          emit-value
          :readonly="isReadOnly"
          @update:model-value="bankChange"
        >
        </v-select>
      </div>
      <div class="col-2">
        <v-input
          v-model="myChecking.routing"
          label="Routing Num"
          :readonly="isReadOnly"
          mask="#########"
        >
        </v-input>
      </div>
      <div class="col-2">
        <v-input
          v-model="myChecking.account"
          label="Account Num"
          :readonly="isReadOnly"
          :maxlength="20"
        >
        </v-input>
      </div>
      <div class="col-2">
        <DatePicker
          :dateValue="myChecking.open_date"
          prompt="Open Date"
          tag="open_date"
          @datePicked="datePicked"
        ></DatePicker>
      </div>
    </div>
    <div class="row justify-between items-center">
      <div class="col-2">
        <v-input
          v-model="myChecking.login"
          label="Account Login"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
      <div col-1></div>
      <div class="col-2">
        <v-input
          v-model="myChecking.pwd"
          label="Account Pwd"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
      <div class="col-2">
        <v-input
          v-model="myChecking.member_number"
          label="Member Num"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
      <div class="col-2"></div>
    </div>
    <div class="row justify-between items-center">
      <div class="col-2">
        <v-input
          v-model="myChecking.debit_card_num"
          label="Debit Num"
          :readonly="isReadOnly"
          type="text"
          mask="####-####-####-####"
        >
        </v-input>
      </div>
      <div class="col-1">
        <v-input
          v-model="myChecking.debit_card_exp"
          label="Debit Exp"
          :readonly="isReadOnly"
          type="text"
          mask="##/##"
        >
        </v-input>
      </div>
      <div class="col-1">
        <v-input
          v-model="myChecking.debit_card_cvv"
          label="Debit Cvv"
          :readonly="isReadOnly"
          type="text"
          mask="###"
        >
        </v-input>
      </div>
      <div class="col-2">
        <v-input
          v-model="myChecking.debit_card_pin"
          label="Debit Pin"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
    </div>
    <div class="row justify-between items-center">
      <div class="col-2">
        <v-select
          v-model="myChecking.device"
          label="Device"
          :options="devices"
          map-options
          emit-value
          :readonly="isReadOnly"
        >
        </v-select>
      </div>
      <div class="col-2">
        <v-select
          v-model="myChecking.account_status"
          label="Account Status"
          :options="accountStatuses"
          map-options
          emit-value
          :readonly="isReadOnly"
        >
        </v-select>
      </div>
      <div class="col-3">
        <DatePicker
          :dateValue="myChecking.reconciled_on"
          prompt="Reconciled On"
          tag="reconciled_on"
          @datePicked="datePicked"
        ></DatePicker>
      </div>
    </div>
    <div class="row justify-between items-center">
      <div class="col-3">
        <v-input
          v-model="myChecking.zelle"
          label="Zelle"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
      <div class="col-3">
        <v-toggle
          v-model="myChecking.wise"
          label="Wise"
          :readonly="isReadOnly"
          color="blue"
        ></v-toggle>
        <!-- true-value="Y"
          false-value="N" -->
      </div>
      <div class="col-3">
        <v-select
          v-if="myChecking.wise == 'Y'"
          v-model="myChecking.wise_device"
          label="Wise Device"
          :options="devices"
          map-options
          emit-value
          :readonly="isReadOnly"
        >
        </v-select>
      </div>
    </div>
    <div class="row justify-between items-center">
      <div class="col-4">
        <v-input
          v-model="myChecking.notes"
          label="Notes"
          :readonly="isReadOnly"
        >
        </v-input>
      </div>
      <div class="col-2">
        <v-input v-model="myChecking.task" label="Task" :readonly="isReadOnly">
        </v-input>
      </div>
      <!-- </div>
          <div class="row justify-between items-center">
            <div class="col-2">
              <v-input
                v-model="myChecking.checking_info"
                label="Checking Info"
                :readonly="isReadOnly"
              >
              </v-input>
            </div> -->
    </div>
  </v-card>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import { clientStore } from "@/stores/clientStore";
import { admStore } from "@/stores/admStore";
import commonService from "@/services/commonService";
import DatePicker from "src/components/common/DatePicker.vue";

const route = useRoute();
const myClientStore = clientStore();
const myAdmStore = admStore();
const Id = ref(useRoute().params.id);
let myChecking = myClientStore.Item;
const isReadOnly = ref(false);
const accountStatuses = ref([]);
const devices = ref([]);
const banks = ref([]);
const bankCode = ref("");

onMounted(() => {
  accountStatuses.value = myAdmStore.PrefixSettingOptions("ACCOUNTSTATUS");
  devices.value = myAdmStore.PrefixSettingOptions("DEVICE");
  banks.value = myAdmStore.PrefixSettingOptions("BANK");
  myChecking = myClientStore.Item;
  bankCode.value = myAdmStore.getKeynameByPrefixAndKeyvalue(
    "BANK",
    myChecking.bank
  );
});

watch(
  () => route.params.id,
  () => (myChecking = myClientStore.Item)
);

const getAccountStatusDescription = (account_status) => {
  return commonService.getSettingDescription(
    this.accountStatuses,
    account_status
  );
};

const bankChange = () => {
  myChecking.bank = myAdmStore.getKeyvalueByPrefixAndKeyname(
    "BANK",
    bankCode.value
  );
  setCheckingXeroId();
};

const setCheckingXeroId = () => {
  myChecking.xero_id = `1.${bankCode.value}-${myChecking.client_code}`;
};

const datePicked = (val, tag) => {
  myChecking[tag] = val;
};
</script>
<style scoped></style>
