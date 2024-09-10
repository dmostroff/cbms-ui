<template>
  <div>
    <v-card>
      <div class="row justify-between items-center">
        <div class="col-1"></div>
        <b>IsValid:</b> {{ isValid }}<v-icon name="arrow_down" /><b>Verity</b
        >{{ verity }}
      </div>
      <div class="row justify-between items-center">
        <div class="col-1">
          <v-input
            v-model="myCcAccount.xero_id"
            label="Xero ID"
            :readonly="true"
          />
        </div>
        <div class="col-2">
          <v-select
            v-model="myCcAccount.card_name"
            :options="myCardStore.CardNames"
            label="Card Name"
            @update:model-value="setCardXeroId"
          />
        </div>
        <div class="col-3">
          <v-btn
            class="secondary v-mx-md"
            label="Change Client"
            size="sm"
            @click="selectClient"
          />
          {{ myCcAccount.client_code }}: {{ myCcAccount.first_name }}
          {{ myCcAccount.last_name }}
        </div>
      </div>
      <div class="row justify-between items-center">
        <div class="col-2">
          <QCurrencyInput
            v-model="myCcAccount.credit_line"
            :options="{ currency: 'USD' }"
            label="Credit Line"
          />
        </div>
        <div class="col-2" sm="6" md="2">
          <DatePicker
            :dateValue="myCcAccount.open_date"
            prompt="Open Date"
            tag="open_date"
            @datePicked="datePicked"
          />
        </div>
        <div class="col-2">
          <v-select
            v-model="myCcAccount.card_status"
            label="Card Status"
            :options="cardStatuses"
            map-options
            emit-value
            :readonly="isReadOnly"
          >
          </v-select>
        </div>
        <div class="col-2">
          <v-select
            v-model="myCcAccount.device"
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
            v-model="myCcAccount.in_charge"
            label="In Charge"
            :readonly="isReadOnly"
          >
          </v-input>
        </div>
      </div>
      <div class="row justify-between items-center">
        <div class="col-2">
          <v-input
            v-model="myCcAccount.card_num"
            label="Card #"
            type="text"
            mask="####-####-####-####"
            :readonly="isReadOnly"
            :rules="[(val) => !!val || 'Field is required']"
          >
          </v-input>
        </div>
        <div class="col-1">
          <v-input
            v-model="myCcAccount.card_exp"
            label="Card Exp"
            type="text"
            mask="##/##"
            @update:model-value="checkCardExp"
            :rules="[(val) => requiredField(val)]"
          >
            <!-- @keydown.enter="checkCardExp" -->
          </v-input>
        </div>
        <div class="col-1">
          <v-input
            v-model="myCcAccount.card_cvv"
            label="CVV"
            type="text"
            mask="###"
            :rules="[(val) => !!val || 'Field is required']"
          >
          </v-input>
        </div>
        <div class="col-1">
          <v-input
            v-model="myCcAccount.card_pin"
            label="Pin"
            type="text"
            mask="####"
          >
          </v-input>
        </div>
        <div class="col-3">
          <v-input
            v-model="myCcAccount.cc_login"
            label="Cc Login"
            :readonly="isReadOnly"
          >
          </v-input>
        </div>
        <div class="col-2">
          <v-input
            v-model="myCcAccount.cc_pwd"
            :type="isPwd ? 'password' : 'text'"
            label="Account Password"
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
      </div>
      <div class="row justify-between items-center">
        <div class="col-2">
          <DatePicker
            :dateValue="myCcAccount.charged_on"
            prompt="Charged On"
            tag="charged_on"
            @datePicked="datePicked"
          />
        </div>
        <div class="col-2">
          <DatePicker
            :dateValue="myCcAccount.due_on"
            prompt="Due On"
            tag="due_on"
            @datePicked="datePicked"
          />
          <!-- <v-input
            v-model="myCcAccount.due_on"
            type="date"
            label="Due On"
            format-date="YYYY-MM-DD"
            :isReadOnly="isReadOnly"
          /> -->
        </div>
        <div class="col-2">
          <v-input
            v-model="myCcAccount.bonus_to_spend"
            label="Bonus to Spend"
            :isReadOnly="isReadOnly"
            @keydown="formatCurrencyInput($event, 'bonus_to_spend')"
          />
          {{ bonusToSpend }}
        </div>
        <div class="col-sm-2 v-mx-lg">
          <DatePicker
            :dateValue="myCcAccount.bonus_spend_by"
            prompt="Spend by"
            tag="bonus_spend_by"
            @datePicked="datePicked"
          />
        </div>
        <div class="col-2">
          <QCurrencyInput
            v-model="myCcAccount.bonus_spent"
            :options="{ currency: 'USD' }"
            label="Spent"
          />
        </div>
      </div>
      <div class="row justify-between items-center">
        <div class="col-2">
          <v-select
            v-model="myCcAccount.task"
            label="Task"
            :options="ccAccountTasks"
            map-options
            emit-value
            :readonly="isReadOnly"
          >
          </v-select>
        </div>
        <div class="col-6">
          <v-input
            v-model="myCcAccount.notes"
            label="Notes"
            :readonly="isReadOnly"
            clearable
          >
          </v-input>
        </div>
        <!-- <div class="col-6">
              <v-input
                v-model="myCcAccount.ccaccount_info"
                label="Ccaccount Info"
                :readonly="isReadOnly"
              >
              </v-input>
            </div>
            <div class="col-2"> </div> -->
      </div>
      <div class="row">
        <div class="cols-6 text-warning">
          <v-space />
          <span v-if="errorMessage">{{ errorMessage }}</span>
          &puncsp;
        </div>
        <div class="cols-6 text-warning">
          <span v-if="!isValid">Some fields are required</span>
          <span v-else>OK</span>
        </div>
      </div>
    </v-card>
    <v-dialog v-model="clientDialog" persistent>
      <ClientSelect
        title="Select the Credit Card's Owner"
        @selected="clientSelected"
        @close="clientSelectedCancel"
      />
    </v-dialog>
    <ConfirmBox
      :key="msgBoxClientConfirm.id"
      :msgBox="msgBoxClientConfirm"
      @confirmed="clientChangeConfirmed"
      @close="clientChangeCancel"
    />
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import QCurrencyInput from "src/components/common/CurrencyInput.vue";
import DatePicker from "src/components/common/DatePicker.vue";
import { ccCardStore } from "@/stores/ccCardStore";
import { clientStore } from "@/stores/clientStore";
import { admStore } from "@/stores/admStore";
import commonService from "@/services/commonService";
import ClientSelect from "src/components/clients/list/ClientSelect.vue";
import ConfirmBox from "src/components/common/ConfirmBox.vue";
import { CcAccountModel } from "src/models/clients/CcAccountModel";
import { msgBoxModel } from "src/models/common/msgBoxModel";

const route = useRoute();
const myAdmStore = admStore();
const myCardStore = ccCardStore();
const myClientStore = clientStore();
let myCcAccount = myClientStore.Item;
console.log("myCcAccount", myCcAccount.constructor.name);

const isReadOnly = ref(false);
const states = admStore().States;
const stateRules = [(v) => (v && v.length <= 2) || "Max 2 characters"];
const isPwd = ref(true);
const errorMessage = ref("");
let clientTemp = {};
const clientDialog = ref(false);
const confirmDialog = ref(false);
const msgBoxClientConfirm = reactive(
  new msgBoxModel("CC Account Form - Select Client")
);

const isValid = computed(() => myCcAccount.isValid());
const verity = ref(myCcAccount.isValid());

watch(
  () => route.params.id,
  () => (myCcAccount = myClientStore.Item)
);

onMounted(async () => {
  const retval = await myCardStore.getCards();
});
const cardStatuses = myAdmStore.PrefixSettingOptions("CARDSTATUS");
const devices = myAdmStore.PrefixSettingOptions("DEVICE");
const ccAccountTasks = myAdmStore.PrefixSettingOptions("CCACCOUNTTASK");
const bonusToSpend = ref(0);

const checkCardExp = () => {
  const isError = commonService.isValidCcExp(
    myCcAccount.card_exp,
    myCcAccount.card_num
  );
  errorMessage.value = isError[0] ? isError[1] : null;
};

const setCardXeroId = () => {
  const card_code = myCardStore.getCardCode(myCcAccount.card_name);
  myCcAccount.xero_id = `${card_code}-${myCcAccount.client_code}`;
};

const selectClient = () => {
  clientDialog.value = true;
};

const createConfirmPrompt = (fromClient, toClient) => {
  return `Change ${fromClient.first_name} ${fromClient.last_name} to ${toClient.first_name} ${toClient.last_name}?`;
};

const clientSelected = (client) => {
  clientDialog.value = false;
  Object.assign(clientTemp, client);
  msgBoxClientConfirm.id = Math.trunc(Math.random() * 10000);
  msgBoxClientConfirm.prompt = createConfirmPrompt(myCcAccount, client);
  msgBoxClientConfirm.message = `Card: '${myCcAccount.card_name}'`;
  msgBoxClientConfirm.areyousure = true;
  msgBoxClientConfirm.dialog = true;
};

const clientSelectedCancel = () => {
  clientDialog.value = false;
};

const clientChangeConfirmed = () => {
  msgBoxClientConfirm.dialog = false;
  // ccam.setFromClient(myCcAccount, clientTemp);
  setCardXeroId();
};

const clientChangeCancel = () => {
  msgBoxClientConfirm.dialog = false;
};

const datePicked = (val, tag) => {
  myCcAccount[tag] = val;
};

const requiredField = (val) => {
  console.log(val);
  return !!val || "Field is required";
};
</script>
<style scoped></style>
