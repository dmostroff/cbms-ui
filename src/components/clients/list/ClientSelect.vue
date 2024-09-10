<template>
  <q-card class="bg-blue-1">
    <q-card-section class="text-h6">{{ props.title }}</q-card-section>
    <q-card-section v-if="clientId" class="justify-center">
      <span class="text-subtitle1 q-mx-sm">{{ client.client_code }}</span>
      <span class="text-h6 q-mx-lg"
        >{{ client.first_name }} {{ client.last_name }}</span
      >
    </q-card-section>
    <q-card-actions class="justify-center">
      <q-btn label="OK" @click="selected" class="primary q-mx-lg" />
      <q-btn label="Cancel" @click="close" class="secondary q-mx-lg" />
    </q-card-actions>
    <q-card-section>
      <q-table
        :title="props.title"
        :rows="clientList"
        :columns="cols"
        :filter="filter"
        @row-click="rowclick"
        virtual-scroll
        :rows-per-page-options="[0]"
        style="height: 60vh"
      >
        <template v-slot:top
          ><q-input v-model="filter" label="Filter"
        /></template>
      </q-table>
      <!-- <q-scroll-area style="height: 100vh">
        <q-list bordered>
          <q-item
            clickable
            v-ripple
            v-for="item in clientList"
            :key="item.id"
            @click="setClient(item)"
          >
            <q-item-section @click="setClient(item)"
              >{{ item.client_code }}] {{ item.last_name }},
              {{ item.first_name }}</q-item-section
            >
          </q-item>
        </q-list>
      </q-scroll-area> -->
    </q-card-section>
  </q-card>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { clientStore } from "@/stores/clientStore";

const props = defineProps({
  title: {
    type: String,
    default: "Select a Client",
  },
});
const emits = defineEmits(["selected", "close"]);

const clientId = ref(null);
const client = ref({});
const clientList = ref([]);
const cols = [
  { name: "client_code", field: "client_code", label: "Code" },
  { name: "first_name", field: "first_name", label: "First" },
  { name: "last_name", field: "last_name", label: "Last" },
];
const filter = ref("");
onMounted(() => {
  clientList.value = clientStore().Clients;
});

const rowclick = (event, item) => {
  setClient(item);
};

const setClient = (aClient) => {
  clientId.value = aClient.id;
  client.value = aClient;
};
const selected = () => {
  emits("selected", client.value);
};

const close = () => {
  emits("close");
};
</script>
