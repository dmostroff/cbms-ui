<template>
  <div>
    <h2>{{ props.title }}</h2>
    <v-data-table
      :headers="props.headers"
      :items="props.items"
      item-key="id"
      items-per-page="5"
    >
      <template v-slot:header.id="{ column }"><span style="font-size: 8px;">Id</span></template>
      <!-- <template v-slot:item="item">
        <v-icon
          class="me-2"
          size="small"
          @click="editItem(item)"
          icon="mdi-pencil"
        ></v-icon>
        <v-icon size="small" @click="deleteItem(item)" icon="mdi-delete"></v-icon>
      </template> -->
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item)" icon="mdi-pencil"></v-icon>
          <v-icon size="small" @click="deleteItem(item)" icon="mdi-delete"></v-icon>
      </template>
    </v-data-table>
    <!-- <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps}">
        <v-btn 
        v-bind="activatorProps"
        color="surface-variant"
        text="Say It Often"
        variant="flat"
        ></v-btn>
      </template>
      <template v-slot:default="{ isActive }">
        <v-card>
          <v-card-text>Help</v-card-text>
          <v-card-actions><v-btn @click="isActive.value=false">Close</v-btn></v-card-actions>
        </v-card>
      </template>
    </v-dialog> -->
  </div>
</template>

<script setup lang="ts">
import ClientData from "@/interfaces/clients/ClientData";
import { ref } from "vue";
const emits = defineEmits(['editItem', 'deleteItem'])
const props = defineProps({
  title: { type: String, default: "Client" },
  headers: { tytpe: Object, default: {} },
  items: { type: Array, default: {} },
});

console.log("SectionList", props.title, props.items);
const isActive = ref(false);

const viewDetails = (item) => {
  console.log(item);
  alert(item);
};

const editItem = (item: ClientData) => {
  console.log(item);
  emits("editItem", item)
};
const deleteItem = (item) => {
  console.log(item);
  alert("delete "+item.id);
  emits("deleteItem", item)
};
</script>

<style></style>
