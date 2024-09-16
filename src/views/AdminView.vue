<template>
  <v-container>
    <v-row>
      <v-col cols="12"><Ping></Ping></v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-tabs v-model="currentItem" background-color="primary">
          <v-tab
            v-for="item in tabItems"
            :key="item.value"
            :href="routerLink(item.value)"
          >
            {{ item.text }}
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12" style="border: 1px blue solid">
        <RouterView />
<!-- 
        <component :is="currentComponent"></component> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import Ping from "@/components/admin/Ping.vue";

// import userService from "@/services/userService";
import AboutUs from "@/components/common/AboutUs.vue";
const router = useRouter();
const loading = ref(false);
const authUser = {};
const menuTitle: string = "Admin";
const currentItem = ref(0);
const tabItems = [
  { text: "Roles", value: "authroles" },
  { text: "Users", value: "authusers" },
  { text: "Settings", value: "admsettings" },
];

const routerLink = (routeName: string) => {
  return router.resolve({ name: routeName }).href;
};

//const genError = computed(()=>apiService.getError())
//const apiError = computed(()=>apiService.getApiError())
//const axiosError = computed(()=>apiService.getAxiosError())
//const showError = computed(()=>apiService.getIsError())
</script>
<style scoped></style>
