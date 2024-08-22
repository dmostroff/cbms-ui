<template>
  <div>
    <v-card class="ma-lg">
      <v-card-title background-color="primary">Login</v-card-title>
      <v-card-text>
        {{ pingResult }}
      </v-card-text>
      <v-card-actions>
        <v-btn label="Ping" style="width: 120px" class="bg-primary text-white q-pa-sm" @click="ping"
          >Ping</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-container class="ma-lg">
      <v-row class="row justify-center" v-if="isLoading">
        <v-progress-linear :indeterminate="false" color="primary" size="3em" />
      </v-row>
      <v-row class="justify-center items-center">
        <v-col cols="5">{{ isLoggedIn }}</v-col>
        <v-col cols="2">
          <v-img src="~/assets/creditcard.png" class="mx-2" style="width: 60%"></v-img>
        </v-col>
        <v-col><v-spacer /></v-col>
      </v-row>
      <v-row v-if="message > ''" class="justify-center items-center text-warning">
        {{ message }}
      </v-row>
      <v-row class="justify-center">
        <v-col cols="6" class="justify-center items-center">
          <div class="text-h5 text-center text-bold q-pt-xl">Please Login</div>
          <div class="pa-sm">
            <v-text-field
              v-model="loginInfo.username"
              label="User Name"
              style="background-color: aliceblue"
              color="primary"
            ></v-text-field>
          </div>
          <div class="pa-sm">
            <v-text-field
              v-model="loginInfo.pwd"
              label="Password"
              :type="isPwd ? 'password' : 'text'"
              hint="Password with toggle"
              @keydown.enter.prevent="login"
              style="background-color: aliceblue"
            >
              <template v-slot:append>
                <v-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </v-text-field>
          </div>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="8" class="justify-center items-center">
          <div v-if="errorLogin > ''" class="text-warning">
            {{ errorLogin }}
          </div>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="4" class="justify-center items-center">
          <div class="pa-sm text-center">
            <v-btn
              label="Login"
              style="width: 120px"
              class="bg-primary text-white q-pa-sm"
              @click="login"
              >Login</v-btn
            >
            <!-- <div v-if="loginResult">
              {{ loginResult }}
            </div> -->
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, defineEmits, computed } from 'vue'
import type { Ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import admService from '@/services/AdmService'
import type { LoginResult } from '@/interfaces/common/LoginInfo'
// import ccCardService from '@/service/ccCardService'
import loginService from '@/services/LoginService'
const emit = defineEmits(['login', 'logout'])

const router = useRouter()
const route = useRoute()
const isPwd = ref(true)
const isLoading = ref(false)
const loginResult = ref({}) as Ref<LoginResult>
const loginInfo = reactive(loginService.loginInfo)
const isLoggedIn = computed(() => loginService.isLoggedIn)

const errorLogin = ref('') as Ref<string>
const routeName = ref(route.name)
const message = ref('')

const loginSetup = () => {
  // loginInfo = userLogin.LoginInfo;
  routeName.value = route.name
  if (route.name == 'logout') {
    if (loginService.isLoggedIn) {
      loginService.logout(loginInfo)
      message.value = 'Logged out.'
    } else {
      loginInfo.username = 'Cheap'
      loginService.clear()
      message.value = ''
    }
  }
}

loginSetup()

const login = async (): Promise<boolean> => {
  isLoading.value = true
  loginResult.value = (await loginService.login(loginInfo)) as LoginResult

  isLoading.value = false
  errorLogin.value = ''
  if (loginService.isLoggedIn) {
    // loadAdmSettingsAndCardData()
    gotoStartPage()
  } else {
    errorLogin.value = loginService.ErrorMsg
  }
  // loginResult.value = JSON.stringify(loginService.UserInfo)
  return loginService.isLoggedIn
}

// const loadAdmSettingsAndCardData = async () => {
//   isLoading.value = true
//   const admSettings = await admService.getSettings()
//   const cards = await ccCardStore().getCards()
//   isLoading.value = false
// }

const gotoStartPage = () => {
  const startPage = loginService.StartPage
  router.push({ name: startPage })
}

const pingResult = ref({})
const ping = async () => {
  pingResult.value = await admService.ping()
}
</script>
