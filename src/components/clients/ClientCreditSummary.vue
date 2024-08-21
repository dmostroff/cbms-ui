<template>
  <div
    class="fit row wrap justify-between items-start content-start bg-green-5 q-px-sm"
    v-if="creditSummary"
  >
    <div class="text-caption col-3">{{ numberOfCardsMsg }}</div>
    <div class="text-caption col-4">Credit Limit: {{ totalCreditLimit }}</div>
    <div class="col-4" v-if="hasStartDate">
      Start Date: <span>{{ minOpenDate }}</span>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import { clientStore } from "/src/stores/clientStore";
import { formatCurrency } from "/src/services/commonService";

const myClientStore = clientStore();
const creditSummary = myClientStore.CreditSummary;

const numberOfCardsMsg = computed(() => {
  if (creditSummary) {
    return (
      "# of card" +
      (creditSummary && creditSummary.cc_account_count === 1 ? "" : "s") +
      " " +
      creditSummary.cc_account_count
    );
  } else {
    return "No Cards";
  }
});

const hasStartDate = computed(() => {
  return creditSummary &&
    "min_open_date" in creditSummary &&
    "" !== creditSummary.min_open_date
    ? true
    : false;
});

const totalCreditLimit = computed(() => {
  return creditSummary.total_credit_limit
    ? formatCurrency(creditSummary.total_credit_limit)
    : null;
});

const minOpenDate = computed(() => {
  return creditSummary.min_open_date ? creditSummary.min_open_date : null;
});
</script>
