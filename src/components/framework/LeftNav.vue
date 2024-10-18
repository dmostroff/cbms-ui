<template>
  <div>
    <v-navigation-drawer v-model="props.show" app>
      <v-list>
        <v-list-item
          clickable
          v-for="(item, idx) in navLinks"
          :key="idx"
          @click="emit('leftnavclick', item.link)"
        >
          <v-icon v-if="item.icon" :icon="item.icon" />
          <span>{{ item.title }}</span>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    {{ props.show }}
  </div>
</template>
<script setup>
import { watch, computed, defineProps } from "vue";
import userLoginStore from "@/stores/userLoginStore";
const emits = defineEmits(["leftnavclick"]);
const userLogin = userLoginStore();
let isLoggedIn = userLogin.IsLoggedIn;

const props = defineProps({
  show: Boolean,
});

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
