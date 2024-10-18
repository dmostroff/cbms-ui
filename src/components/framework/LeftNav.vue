<template>
  <v-list>
    <v-list-item
      clickable
      v-for="(item, idx) in navLinks"
      :key="idx"
      @click="emits('leftNavClick', item.link)"
    >
      <v-icon v-if="item.icon" :icon="item.icon" />
      <span>{{ item.title }}</span>
    </v-list-item>
  </v-list>
</template>
<script setup>
import { watch, computed } from "vue";
import userLoginStore from "@/stores/userLoginStore";
const userLogin = userLoginStore();
let isLoggedIn = userLogin.IsLoggedIn;
const emits = defineEmits(['leftNavClick'])
watch(userLogin, () => {
  isLoggedIn = userLogin.IsLoggedIn;
});

const navLinks = [
  {
    title: "Clients",
    link: "clients",
    caption: "List of all clients",
  },
  {
    title: "Cards",
    link: "cards",
    caption: "Cc Cards",
  },
  {
    title: "Credit Summary",
    link: "creditsummary",
    caption: "List of Credit Summaries",
  },
  {
    title: "Admin",
    link: "admin",
    caption: "Administration",
  },
  {
    title: isLoggedIn ? "Logout" : "Login",
    link: isLoggedIn ? "logout" : "login",
  },
];
</script>
