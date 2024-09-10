<template>
  <v-card v-if="myClientAddress">
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Client Id/Code</th>
          <th>Address</th>
          <th>State</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{ myClientStore.Item }}</td>
          <td>
            {{ myClientAddress.client_id }} {{ myClientAddress.client_code }}
          </td>
          <td>{{ myClientAddress.street_address }}</td>
          <td>{{ myClientAddress.state }}</td>
        </tr>
      </tbody>
    </table>
    <table>
      <tr>
        <th>IsValid Item</th>
        <th>Item.isValid()</th>
        <th>Address Valid</th>
      </tr>
      <tr>
        <td>{{ myClientStore.ItemIsValid }}</td>
        <td>{{ myClientStore.Item.isValid() }}</td>
        <td>{{ myClientAddress.isValid() }}</td>
      </tr>
    </table>
    <div class="row justify-between items-center">
      <div class="col-1 text-caption" style="background-color: aliceblue"></div>
      <div class="col-3">
        <v-toggle
          v-model="myClientAddress.is_current"
          label="Is Current"
          :readonly="isReadOnly"
          color="blue"
          :true-value="true"
          :false-value="false"
        />
      </div>
      <div class="col-4">
        <v-input
          v-model="myClientAddress.street_address"
          label="Street Address"
          :readonly="isReadOnly"
        />
      </div>
    </div>
    <div class="row justify-between items-center">
      <div class="col-4">
        <v-input
          v-model="myClientAddress.city"
          label="City"
          :readonly="isReadOnly"
        />
      </div>
      <div class="col-2">
        <v-select
          v-model="myClientAddress.state"
          label="State"
          :options="states"
          map-options
          emit-value
        />
      </div>
      <div class="col-1">
        <v-input
          v-model="myClientAddress.state"
          label="State"
          :readonly="true"
          message="Use two letter state code"
          maxlength="2"
          :rules="stateRules"
        />
      </div>
      <div class="col-2">
        <v-input
          v-model="myClientAddress.zip"
          label="Zip"
          type="text"
          mask="#####-####"
          :readonly="isReadOnly"
        />
      </div>
    </div>
  </v-card>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import { clientStore } from "@/stores/clientStore";
import { admStore } from "@/stores/admStore";
import commonService from "@/services/commonService";

const route = useRoute();
const myClientStore = clientStore();
let myClientAddress = myClientStore.Item;
console.log(
  "AddressForm",
  route,
  myClientAddress.constructor.name,
  myClientStore.Item.constructor.name
);
const isValid = computed(() => myClientAddress.isValid());
const isReadOnly = ref(false);
const states = admStore().States;
const stateRules = [(v) => (v && v.length <= 2) || "Max 2 characters"];

const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
});

const setClientAddress = () => {
  console.log("AddressForm", route.params.id, myClientStore.Item);
  myClientAddress = myClientStore.Item;
};

watch(
  () => route.params.id,
  () => setClientAddress()
);

onMounted(() => {
  console.log(
    "onMounted: AddressForm",
    route.params.id,
    myClientAddress,
    myClientStore.Item
  );
});
</script>
