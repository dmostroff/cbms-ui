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
      <p>{{ showError }}</p>
      <p>{{  genError }} {{  apiError }} {{ axiosError}}</p>
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
import { ref, computed } from 'vue'
import router from '@/router'
import apiService from '@/services/apiService';
// @ts-ignore
import AppTopBar from '@/components/framework/AppTopBar.vue'
// @ts-ignore
import AppFooter from '@/components/framework/AppFooter.vue'


const isError = computed(() => {
  let retval = false
  if( apiService.getIsError()) {
    router.push( { name: 'network-error'})
    retval = true
  } else {
    // router.push( {name: 'home'})
  }
  return retval
})

const genError = computed(()=>apiService.getError())
const apiError = computed(()=>apiService.getApiError())
const axiosError = computed(()=>apiService.getAxiosError())
const showError = computed(()=>apiService.getIsError())

</script>
