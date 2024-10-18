<template>
  <v-app>
    <v-navigation-drawer v-model="showLeftNav" app>
      <LeftNav :show="showLeftNav" @leftNavClick="handleLeftNavClick"></LeftNav>
    </v-navigation-drawer>
    <v-app-bar class="bg-secondary text-white shadow-2">
      <!-- <header> -->
      <AppTopBar @toggleLeftDrawer="handleToggleLeftNav"></AppTopBar>
    </v-app-bar>
    <v-main>
      <RouterView />
    </v-main>
    <v-footer>
      <AppFooter />
    </v-footer>
  </v-app>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import router from "@/router";
import apiService from "@/services/apiService";
// @ts-ignore
import AppTopBar from "@/components/framework/AppTopBar.vue";
// @ts-ignore
import AppFooter from "@/components/framework/AppFooter.vue";
import LeftNav from "./LeftNav.vue";

const showLeftNav = ref(false);

const isError = computed(() => {
  let retval = false;
  if (apiService.getIsError()) {
    router.push({ name: "network-error" });
    retval = true;
  } else {
    // router.push( {name: 'home'})
  }
  return retval;
});

const handleToggleLeftNav = () => {
  showLeftNav.value = !showLeftNav.value;
};

const handleLeftNavClick = (leftNavItem: string) => {
  showLeftNav.value = false;
  router.push({ name: leftNavItem });
};
</script>
export default { name: 'Canvas', };
