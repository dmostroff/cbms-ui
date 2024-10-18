<template>
  <div>
    <v-app-bar class="bg-secondary text-white shadow-2">
      <v-btn
        flat
        dense
        round
        icon="mdi-menu"
        aria-label="Menu"
        @click="toggleLeftDrawer"
      />
      <v-divider dark vertical inset />
      <div class="mx-md">{{ app_title }}</div>
      <div class="mx-md">{{ routeName }}</div>
      <!-- <div class="mx-md">{{ msg }}: {{ count }} {{ app_name }}</div> -->
      <v-spacer></v-spacer>
      <v-divider inset spaced />
      <div v-if="showLogout">
        <v-btn flat dense round icon="logout" class="mx-lg align-center" @click="logout">
          <span class="mx-sm">Logout</span>
          <span class="mx-lg display-3">Welcome {{ username }}</span>
          <span></span>
          <v-tab :to="{ name: 'logout' }">Logout</v-tab>
        </v-btn>
      </div>
      <div v-if="showLogin">
        <v-btn flat dense round icon="login" class="mx-lg align-end" @click="login">
          <!-- <span class="mx-sm">Login</span> -->
          <v-tab :to="{ name: 'login' }">Login</v-tab>
        </v-btn>
      </div>
      <div><TickingClock /></div>
      <div class="mx-sm">v{{ app_version }}</div>
    </v-app-bar>
    <!-- <v-container>
      <v-row>
        <v-col>Gen: {{ genError }}</v-col>
      </v-row>
      <v-row>
        <v-col>Axios: {{ axiosError }}</v-col>
        <v-col>Api: {{ apiError }}</v-col>
      </v-row>
    </v-container> -->
  </div>
</template>
<script setup lang="ts">
/// <reference types="vite/client" />
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import { AxiosError } from "axios";
import apiService from "@/services/apiService";
// @ts-ignore
import TickingClock from "@/components/framework/TickingClock.vue";
import loginService from "@/services/loginService";
import IApiError from "@/interfaces/api/IApiError";

const emits = defineEmits(['toggleLeftDrawer'])
const router = useRouter();
const route = useRoute();

const app_title = import.meta.env.VITE_APP_TITLE;
const app_version = import.meta.env.VITE_APP_VERSION;
const app_name = import.meta.env.MYNAME;
const username = ref(loginService.getUserName());
const toggleLeftDrawer = () => { emits("toggleLeftDrawer")}
// const userLogin = loginService.userLogin
// const isLoggedIn = ref(loginService.isLoggedIn)
// const username = ref(loginService.userName)
const msg = ref("");
const count = ref(0);

const showLogin = computed(() => {
  return (
    !loginService.isLoggedIn() && ["login", "logout"].indexOf(route.name as string) == -1
  );
});

const showLogout = computed(() => {
  return (
    loginService.isLoggedIn() && ["login", "logout"].indexOf(route.name as string) == -1
  );
});

// const genError = computed(() => apiService.getError());
// const apiError = computed(() => apiService.getApiError());
// const axiosError = computed(() => apiService.getAxiosError());
const isError = computed(() => apiService.getIsError());

const routeName = ref(route.name);
const login = () => {
  if (route.name != "login") {
    router.push({ name: "login" });
  }
};
const logout = () => {
  if (route.name != "logout") {
    loginService.logout();
    router.push({ name: "logout" });
  }
};

const monitorLogin = () => {
  return setInterval(() => {
    msg.value = "monitorLogin";
    // if (!loginService.isLoggedIn) {
    //   login()
    // }
    count.value++;
  }, 100 * 60);
};

msg.value = "Begin";
const intervalID = monitorLogin();
const apiError = computed(() => apiService.getApiError());
const axiosError = computed(() => apiService.getAxiosError());

watch(apiError, (newApiError: IApiError) => {
  if (newApiError && newApiError.rc == -8) {
    apiService.clearApiError();
    router.push({ name: "login" });
  }
});

watch(axiosError, (newAxiosError: typeof AxiosError) => {
  if (newAxiosError && newAxiosError.code == "ERR_NETWORK") {
    // apiService.clearAxiosError()
    router.push({ name: "network-error" });
  }
});
</script>
<script lang="ts"></script>
