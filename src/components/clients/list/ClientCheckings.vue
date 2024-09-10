<template>
  <q-card>
    <div class="q-h2">Client Checking Account</div>
    <q-table
      title="Checking Accounts"
      :rows="myData"
      :columns="columns"
      row-key="name"
    />
    <div v-for="(item, idx) in myData" :key="idx">
      {{ item.name }} {{ item.calories }}
    </div>
  </q-card>
</template>

<script setup>
import { ref } from "vue";
const columns = [
  {
    name: "name",
    required: true,
    label: "Dessert (100g serving)",
    align: "left",
    field: "name",
    sortable: true,
    classes: "my-class",
    style: "width: 180px",
  },
  {
    name: "calories",
    required: true,
    label: "Calories",
    align: "left",
    field: "calories",
    sortable: true,
    classes: "my-class",
  },
  {
    name: "fat",
    required: true,
    label: "Fat",
    align: "left",
    field: "fat",
    sortable: true,
    classes: "text-blue-4",
  },
];
const myData = ref([
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "Pizza",
    calories: 2339,
    fat: 16.0,
    carbs: 124,
    protein: 14.0,
    sodium: 187,
    calcium: "34%",
    iron: "3%",
  },
  {
    name: "Chocolate",
    calories: 2331,
    fat: 13.0,
    carbs: 1234,
    protein: 4.0,
    sodium: 17,
    calcium: "5%",
    iron: "8%",
  },
]);
</script>

<style>
.my-class {
  color: blueviolet;
  background-color: chocolate;
}
</style>
