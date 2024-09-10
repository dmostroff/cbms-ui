<template>
  <div>
    <div>Client Addresses</div>
    <div>{{ name }}</div>
    <!-- <div class="row">AA {{ app.defaults.baseURL }}!!</div> -->
    <div class="row">BB {{ $api.defaults.baseURL }}!!</div>
    <div class="row">
      <q-btn class="primary" @click="ping">Ping</q-btn>
    </div>
  </div>
  <div class="row">
    <div class="col-4 text-blue-9">{{ message }}</div>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { getCurrentInstance } from "vue";
import { ref } from "vue";
import { api } from "boot/axios";
const $q = useQuasar();
const name = $q.config.myname;
const { proxy } = getCurrentInstance();
const app1 = proxy.$parent.api;
const $api = api;
const message = ref("Richard");

const ping = async function () {
  try {
    message.value = await $api.get("http://localhost:5000/ping");
  } catch (error) {
    message.value = error;
  }
  // $api.get($api.default.baseURL + "/ping");
  // alert("ping");
  // let x = as.ping();
};
</script>

<style>
</style>
