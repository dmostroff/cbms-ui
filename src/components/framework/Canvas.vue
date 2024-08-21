<template>
  <div>
    <header>
      <AppTopBar></AppTopBar>
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
    <footer><AppFooter/></footer>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import AppTopBar from '@/components/framework/AppTopBar.vue'
import AppFooter from '@/components/framework/AppFooter.vue'
</script>
