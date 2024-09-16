<template>
  <div>
    <header>
      <AppTopBar></AppTopBar>
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


</script>
