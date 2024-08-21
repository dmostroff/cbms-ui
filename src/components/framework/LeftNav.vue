<template>
  <q-list bordered separator>
    <q-item-label header>Select a Category</q-item-label>
    <q-item clickable v-for="(item, idx) in navLinks" :key="idx">
      <!-- v-bind="item.link" -->
      <q-item-section v-if="item.icon" avatar>
        <q-icon :name="item.icon" />
      </q-item-section>

      <q-item-section>
        <router-link
          :to="{ name: item.link }"
          active-class="primary"
          @click="$emit('leftnavclick', item.link)"
        >
          <q-item-label>{{ item.title }}</q-item-label>
          <q-item-label caption>{{ item.caption }}</q-item-label>
        </router-link>
      </q-item-section>
    </q-item>
  </q-list>
</template>
<script setup>
import { watch, computed } from 'vue'
import { userLoginStore } from '@/stores/UserLoginStore'
const emits = defineEmits(['leftnavclick'])
const userLogin = userLoginStore()
let isLoggedIn = userLogin.IsLoggedIn

watch(userLogin, () => {
  isLoggedIn = userLogin.IsLoggedIn
})

const navLinks = [
  {
    title: 'Clients',
    link: 'clients',
    caption: 'List of all clients'
  },
  {
    title: 'Cards',
    link: 'cards',
    caption: 'Cc Cards'
  },
  {
    title: 'Credit Summary',
    link: 'creditsummary',
    caption: 'List of Credit Summaries'
  },
  {
    title: 'Admin',
    link: 'admin',
    caption: 'Administration'
  },
  {
    title: isLoggedIn ? 'Logout' : 'Login',
    link: isLoggedIn ? 'logout' : 'login'
  }
]
</script>
