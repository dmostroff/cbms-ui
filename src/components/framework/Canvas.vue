<template>
  <div>
    <header>
      <!-- <AppTopBar></AppTopBar> -->
      <img
        alt="CBMS"
        class="logo"
        src="@/assets/generic_credit_card.jpg"
        width="125"
        height="125"
      />
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
          <RouterLink to="/clients">Clients</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
    <p>Nation {{ count }}</p>
    <v-btn @click="click">counter</v-btn>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
//import AppTopBar from './AppTopBar.vue'

const count = ref(0)
const click = () => count.value++
</script>
