<template>
  <div>
    <div v-if="isLoading"><v-spinner-dots size="3em" /></div>
    <v-card v-if="clientPerson"
      ><!-- -->
      <v-card class="text-h4 text-white bg-blue-3">
        {{ title }}
        <div class="v-mx-lg text-end text-caption">
          Recorded on: {{ clientPerson.recorded_on }} {{ version }}
        </div>
        <!-- <div class="text-body1">{{ clientPerson }}</div> -->
      </v-card>
      <v-separator class="full-width" />
      <v-card>
        <div class="text-caption">
          {{ prevClientPerson.repr() }} || {{ isValid }}
        </div>
      </v-card>
      <v-separator />
      <v-card>
        <div class="row justify-between items-center">
          <div class="col-1">
            <v-input
              :dense="true"
              v-model="clientPerson.client_code"
              label="Client Code"
              type="text"
              :readonly="true"
              :rules="[(val) => !!val || 'Field is required']"
            ></v-input>
          </div>
          <div class="col-3">
            <v-input
              :dense="true"
              v-model="clientPerson.last_name"
              label="Last Name"
              type="text"
              :rules="[(val) => !!val || 'Field is required']"
              :readonly="isReadOnly"
            >
            </v-input>
          </div>
          <div class="col-3">
            <v-input
              :dense="true"
              v-model="clientPerson.first_name"
              label="First Name"
              type="text"
              :readonly="isReadOnly"
              :rules="[(val) => !!val || 'Field is required']"
            >
            </v-input>
          </div>
          <div class="col-3">
            <v-input
              :dense="true"
              v-model="clientPerson.middle_name"
              label="Middle"
              type="text"
              :readonly="isReadOnly"
            >
            </v-input>
          </div>
        </div>
        <div class="row justify-between items-center">
          {{ clientPerson.client_status }}
          <div class="col-2">
            <v-select
              v-model="clientPerson.client_status"
              map-options
              emit-value
              label="Status"
              type="text"
              :options="clientStatuses"
              :readonly="isReadOnly"
            >
            </v-select>
          </div>
          <div class="col-3">
            Age {{ clientAge }}
            <v-input
              type="text"
              v-model="clientPerson.dob"
              label="Date of Birth"
              :rules="[validDate]"
            >
              <template v-slot:append>
                <v-icon name="event" class="cursor-pointer">
                  <v-popup-proxy
                    ref="qDateProxy"
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <v-date v-model="clientPerson.dob" mask="M/DD/YYYY">
                      <div class="row items-center justify-end">
                        <v-btn
                          v-close-popup
                          label="Close"
                          color="primary"
                          flat
                        />
                      </div>
                    </v-date>
                  </v-popup-proxy>
                </v-icon>
              </template>
            </v-input>
          </div>
          <div class="col-3">
            <v-input
              v-model="clientPerson.ssn"
              label="SSN"
              type="text"
              mask="###-##-####"
              :readonly="isReadOnly"
            >
            </v-input>
          </div>
        </div>
        <div class="row justify-between items-center">
          <div class="col-3">
            <v-input
              :dense="true"
              v-model="clientPerson.mmn"
              label="MMN"
              type="text"
              :readonly="isReadOnly"
            >
            </v-input>
          </div>
          <div class="col-3">
            <v-input
              :dense="true"
              v-model="clientPerson.email"
              label="Email"
              type="text"
              :readonly="isReadOnly"
            >
            </v-input>
          </div>
          <div class="col-2">
            <v-input
              v-model="clientPerson.pwd"
              :type="isPwd ? 'password' : 'text'"
              label="Client Password"
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
          <div class="col-3">
            <v-input
              :dense="true"
              v-model="clientPerson.occupation"
              label="Occupation"
              type="text"
              :readonly="isReadOnly"
            >
            </v-input>
          </div>
          <div class="col-3">
            <v-input
              :dense="true"
              v-model="clientPerson.employer"
              label="Employer"
              type="text"
              :readonly="isReadOnly"
            >
            </v-input>
          </div>
          <div class="col-2">
            <QCurrencyInput
              v-model="clientPerson.income"
              :options="{ currency: 'USD' }"
              label="Income"
            />
            <!-- Number value: <code>{{ clientPerson.income }}</code> -->

            <!-- <QCurrencyInput
              outlined
              :modelValue="clientPerson.income"
              tag="income"
              @inputCurrency="onInputCurrency"
              @changeCurrency="onChangeCurrency"
            /> -->
            <!-- <v-input
              :dense="true"
              v-model="clientPerson.income"
              label="Income"
              type="text"
              :keydown="formatCurrencyInput('income')"
              :readonly="isReadOnly"
            >
            </v-input> -->
          </div>
        </div>
        <div class="row justify-between items-center">
          <div class="col-2">
            <v-input
              :dense="true"
              v-model="clientPerson.phone"
              label="Phone"
              type="text"
              mask="###-###-####"
              :readonly="isReadOnly"
            >
              <!-- :keydown="formatPhone('phone')" -->
            </v-input>
          </div>
          <div class="col-2">
            <v-input
              :dense="true"
              v-model="clientPerson.phone_2"
              label="Phone 2"
              type="text"
              mask="###-###-####"
              :readonly="isReadOnly"
            >
            </v-input>
          </div>
          <!-- <div class="col-4">
               <v-input :dense="true"
                v-model="clientPerson.client_info"
                label="Client Info"
                :readonly="isReadOnly"
              >
               </v-input>
            </div> -->
        </div>
        <div class="row justify-between items-center">
          <div class="col-2">
            <v-select
              v-model="clientPerson.tax_status"
              map-options
              emit-value
              label="Tax Status"
              type="text"
              :options="taxStatuses"
              :readonly="isReadOnly"
            >
            </v-select>
          </div>
          <div class="col-1">
            {{ clientPerson.wise }}
            <v-toggle
              v-model="clientPerson.wise"
              color="green"
              label="Wise"
              type="text"
              hide-details
              readonly
            ></v-toggle>
          </div>
          <div class="col-5">
            <v-input
              :dense="true"
              v-model="clientPerson.notes"
              label="Notes"
              type="text"
              :readonly="isReadOnly"
            >
            </v-input>
          </div>
        </div>
      </v-card>
      <v-card-actions>
        <EditSaveCancel
          :isReadOnly="isReadOnly"
          :isValid="isValid"
          @buttonClick="saveCancelClick"
        ></EditSaveCancel>
      </v-card-actions>
    </v-card>
    <!-- <MessageBox
      :key="msgBoxConfirm.id"
      :msgBox="msgBoxConfirm"
      :isError="true"
      @close="messageBoxClose"
    ></MessageBox> -->
  </div>
</template>
<script setup>
import { ref, reactive, computed, onMounted } from "vue";
// import { useCurrencyInput } from "vue-currency-input";
import { admStore } from "@/stores/admStore";
import { clientStore } from "@/stores/clientStore";
import commonService, {
  getDate,
  getAge,
  formatCurrencyInput,
  formatCurrency,
  formatDate,
} from "@/services/commonService";
import ccd from "@/stores/clientComponentData";
import EditSaveCancel from "src/components/common/EditSaveCancel.vue";
import QCurrencyInput from "@/components/common/CurrencyInput.vue";
// import MessageBox from "src/components/common/MessageBox.vue";
import { msgBoxModel } from "@/models/common/msgBoxModel";
import { ClientPersonModel } from "src/models/clients/ClientPersonModel";

const myClientStore = clientStore();
const myAdmStore = admStore();
let clientPerson = ref(new ClientPersonModel(null));
let prevClientPerson = new ClientPersonModel(null);
const isReadOnly = ref(false);
let clientStatuses = [];
let taxStatuses = [];
const isLoading = ref(false);
const isPwd = ref(true);
const title = ccd.getTitle("person");
const msgBoxConfirm = reactive(new msgBoxModel());
const isValid = computed(() => clientPerson.value.isValid());
// const formattedIncome = ref(useCurrencyInput(clientPerson.value.income));
const formattedIncome = ref(clientPerson.value.income);
const version = "1.2";
const dateOptions = [
  {
    mask: "MM/DD/YYYY",
    locale: "en-US",
  },
];
const options = { currency: "USD" };

onMounted(() => {
  console.log("ClientPersonForm onMounted");
  clientPerson.value = new ClientPersonModel(myClientStore.ClientPerson);
  clientStatuses = myAdmStore.PrefixSettingOptions("CLIENTSTATUS");
  taxStatuses = myAdmStore.PrefixSettingOptions("TAXSTATUS");
  msgBoxConfirm.title = ccd.getTitle("person");
  // clientPerson = new ClientPersonModel(myClientStore.ClientPerson);

  console.log("onMounted...", clientPerson.value.dob);
  // .toLocaleDateString("en-US", {
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "2-digit",
  // });
  // myClientStore.setItem(clientPerson);
  prevClientPerson = new ClientPersonModel(clientPerson.value);
});

// const formatCurrencyInput = (field) => {
//   return commonService.formatCurrencyInput(clientPerson[field]);
// };
const clientAge = computed(() => {
  return clientPerson.value && clientPerson.value.dob
    ? getAge(clientPerson.value.dob)
    : "";
});

const updateClientStatusDesc = () => {
  const statusItem = clientStatuses.find(
    (item) => item.value == clientPerson.value.client_status
  );
  if (statusItem) {
    clientPerson.value.client_status_desc = statusItem.label;
  }
};

const saveCancelClick = async (action) => {
  if (action == "save") {
    isLoading.value = true;
    updateClientStatusDesc();
    const resp = await myClientStore.savePerson(clientPerson.value);
    console.log(resp.to_data);
    myClientStore.updateClientList(clientPerson.value);
    isLoading.value = false;
  } else {
    clientPerson.value.assign(prevClientPerson);
  }
  console.log(action);
};

const validDate = (dt) =>
  commonService.isValidDate(dt) || "Please enter a valid date M/D/Y";

const setValue = (value) => {
  setValue(this.$refs.input, value);
};

const onInputCurrency = (incomeValue) => {
  clientPerson.value.income = incomeValue;
};

const onChangeCurrency = (incomeValue) => {
  clientPerson.value.income = incomeValue;
};
</script>
