<template>
  <v-toolbar class="bg-secondary text-white shadow-2">
    <v-btn flat dense round icon="menu" aria-label="Menu" @click="$emit('toggleLeftDrawer')" />
    <v-divider dark vertical inset />
    <div class="mx-md">{{ app_title }}</div>
    <div class="mx-md">{{ routeName }}</div>
    <div class="mx-md">{{ msg }}: {{ count }} {{ app_name }}</div>
    <v-spacer></v-spacer>
    <v-divider inset spaced />
    <!-- <div v-if="showLogout">
      <v-btn flat dense round icon="logout" class="mx-lg align-center" @click="logout">
        <span class="mx-sm">Logout</span>
        <span class="mx-lg display-3">Welcome {{ username }}</span> -->
        <!-- <v-route-tab :to="{ name: 'login' }" label="Login" />
      </v-btn>
    </div> -->
    <!-- <div v-if="showLogin">
      <v-btn flat dense round icon="login" class="mx-lg align-end" @click="login">
        <span class="mx-sm">Login</span>
      </v-btn>
    </div> -->
    <div><TickingClock /></div>
    <div class="mx-sm">v{{ app_version }}</div>
  </v-toolbar>
</template>
<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useRoute } from 'vue-router'
import TickingClock from '@/components/framework/TickingClock.vue'
import loginService from '@/services/LoginService'

// const $emits = defineEmits(['toggleLeftDrawer'])

const router = useRouter()
const route = useRoute()
const routeName = ref(route.name)
const app_title = import.meta.env.VITE_APP_TITLE
const app_version = import.meta.env.VITE_APP_VERSION
const app_name = import.meta.env.MYNAME

// const userLogin = loginService.userLogin
// const isLoggedIn = ref(loginService.isLoggedIn)
// const username = ref(loginService.userName)
const msg = ref('')
const count = ref(0)
let intervalID = 0

onMounted(() => {
  msg.value = 'Begin'
  intervalID = monitorLogin()
})

onUnmounted(() => {
  clearInterval(intervalID)
})

// const showLogin = computed(
//   () => !loginService.isLoggedIn && ['login', 'logout'].indexOf(route.name) == -1
// )
// const showLogout = computed(
//   () => loginService.isLoggedIn && ['login', 'logout'].indexOf(route.name) == -1
// )
// watch(
//   () => route.name,
//   () => {
//     routeName.value = 'label' in route.meta ? route.meta.label : route.name
//   }
// )

// watch(userLogin, () => {
//   username.value = loginService.userName
//   isLoggedIn.value = loginService.isLoggedIn
// })

// const login = () => {
//   if (route.name != 'login') {
//     router.push({ name: 'login' })
//   }
// }
// const logout = () => {
//   if (route.name != 'logout') {
//     router.push({ name: 'logout' })
//   }
// }

const monitorLogin = () => {
  return setInterval(() => {
    msg.value = 'monitorLogin'
    // if (!loginService.isLoggedIn) {
    //   login()
    // }
    count.value++
  }, 1000 * 60)
}
</script>
