<template>
  <!-- <q-btn color="primary" label="Client Data" dense size="sm" class="dense"> -->
  <div ref="leftNav">
    <q-menu auto-close>
      <q-list hightlight separator class="text-white text-caption">
        <q-item
          hightlight
          separator
          :class="item.value == selectedItem ? 'bg-blue-5' : 'bg-black'"
          v-for="(item, idx) in clientItems"
          :key="idx"
        >
          <div @click="$emit('sectionClick', item.value)">
            {{ item.text }}
          </div>
        </q-item>
      </q-list>
    </q-menu>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  showLeftNav: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["sectionClick"]);
const selectedItem = ref(null);
const showMenu = ref(props.showLeftNav);
const leftNav = ref(null);

watch(
  () => props.showLeftNav,
  () => {
    if (showMenu.value) {
      leftNav.value.click();
    }
    showMenu.value = props.showLeftNav;
  }
);

const clientItems = [
  {
    text: "Personal",
    value: "person",
  },
  {
    text: "Addresses",
    value: "addresses",
  },
  {
    text: "Credit Cards",
    value: "cc_accounts",
  },
  {
    text: "Loans",
    value: "loans",
  },
  {
    text: "Checking",
    value: "checkings",
  },
  {
    text: "Credit Reports",
    value: "credit_reports",
  },
  {
    text: "Israel Info",
    value: "client_israels",
  },
  {
    text: "Credit Line History",
    value: "credit_line_histories",
  },
];
</script>
