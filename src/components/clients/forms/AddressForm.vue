<template>
  <v-card>
    <v-form v-model="addressValid">
      <v-container v-if="myClientAddress">
        <v-row no-gutters>
          <v-col cols="1">{{ myClientAddress.id }}</v-col>
          <v-col cols="2">
            <v-switch
              v-model="myClientAddress.is_current"
              label="Is Current"
              :readonly="isReadOnly"
              color="blue"
              :true-value="true"
              :false-value="false"
            />
          </v-col>
          <v-col cols="9">
            <v-text-field
              v-model="myClientAddress.street_address"
              label="Street Address"
              :readonly="isReadOnly"
            />
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="4">
            <v-text-field v-model="myClientAddress.city" label="City" :readonly="isReadOnly" />
          </v-col>
          <v-col cols="2">
            <v-select
              v-model="currentState"
              label="State"
              :items="states"
              item-text="label"
              item-value="value"
            />
          </v-col>
          <v-col cols="1">
            <v-text-field
              v-model="myClientAddress.state"
              label="State"
              :readonly="true"
              message="Use two letter state code"
              maxlength="2"
              :rules="stateRules"
            />
          </v-col>
          <v-col cols="2">
            <v-text-field
              v-model="myClientAddress.zip"
              label="Zip"
              type="text"
              mask="#####-####"
              :readonly="isReadOnly"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from "vue";
import { useRoute } from "vue-router";
import clientService from "@/services/clients/ClientService";
import ClientData from "@/interfaces/clients/ClientData";
import ClientAddress from "@/interfaces/clients/ClientAddress";
import { statesDropDown } from "@/stores/admStore";
import commonService from "@/services/commonService";

const route = useRoute();
const props = defineProps(["clientAddress"]);
const myClientAddress = reactive(props.clientAddress);
const addressValid = ref(true)
const isValid = () => { true }
const isReadOnly = ref(false);
const states = ref(statesDropDown);
const currentState = statesDropDown.filter( (item) => { item.value == myClientAddress.state })[0]
const stateRules = [(v: string) => (v && v.length <= 2) || "Max 2 characters"];

// const setClientAddress = () => {
//   console.log("AddressForm", route.params.id, myClientStore.Item);
//   myClientAddress = myClientStore.Item;
// };

// watch(
//   () => route.params.id,
//   () => setClientAddress()
// );

// onMounted(() => {
//   console.log(
//     "onMounted: AddressForm",
//     route.params.id,
//     myClientAddress,
//     myClientStore.Item
//   );
// });
</script>
