<template>
  <div>
    <img
        alt="CBMS"
        class="logo"
        src="@/assets/generic_credit_card.jpg"
        width="125"
        height="125"
      />
    <v-container class="ma-lg" color="red" background-color="red lighten-5">
      <v-row class="row justify-center" v-if="isLoading">
        <v-progress-linear :indeterminate="false" color="primary" size="3em" />
      </v-row>
      <v-row class="justify-center items-center">
        <v-col cols="5">Is Logged In: {{ isLoggedIn }}</v-col>
        <v-col cols="2">
          <v-img src="~/assets/creditcard.png" class="mx-2" style="width: 60%"></v-img>
        </v-col>
        <v-col><v-spacer /></v-col>
      </v-row>
      <v-row v-if="showMessage" class="justify-center items-center">
        <v-col cols="12" class="text-warning">{{ message }}</v-col>
        </v-row>
      <v-row class="justify-center">
        <v-col cols="6" class="justify-center items-center">
          <div class="text-h5 text-center text-bold q-pt-xl">Please Login</div>
          <div class="pa-sm">
            <v-text-field
              v-model="loginInfo.username"
              label="User Name"
              color="black"
            >
            <template v-slot:append></template>
            </v-text-field>
          </div>
          <div class="pa-sm">
            <v-text-field
              v-model="loginInfo.pwd"
              label="Password"
              :type="isPwd ? 'password' : 'text'"
              hint="Password with toggle"
              @keydown.enter.prevent="login"
              color="secondary"
            >
              <template v-slot:append>
                <v-icon
                  v-if="isPwd"
                  icon="mdi-eye"
                  @click="isPwd = !isPwd"
                ></v-icon>
                <v-icon
                  v-else
                  icon="mdi-eye-off"
                  @click="isPwd = !isPwd"
                ></v-icon>
              </template>
            </v-text-field>
          </div>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="8" class="justify-center items-center">
          <div v-if="isErrorLogin" class="text-warning">
            {{ errorLogin }}
          </div>
        </v-col>
      </v-row>
      <v-row class="justify-center">
        <v-col cols="4" class="justify-center items-center">
          <div class="pa-sm text-center">
            <v-btn
              label="Login"
              color="primary"
              style="width: 120px"
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
import { ref, reactive, computed } from "vue"
import type { Ref } from 'vue'
import router from "@/router"
import { useRouter, useRoute } from 'vue-router'
import admService from '@/services/admService'
import type { LoginResult, LogoutInfo } from '@/interfaces/common/LoginInfo'
// import ccCardService from '@/service/ccCardService'
import loginService from '@/services/loginService'

// const router = useRouter()
const route = useRoute()
const isPwd = ref(true)
const isLoading = ref(false)
const loginResult = ref({}) as Ref<LoginResult>
const loginInfo = reactive(loginService.loginInfo)
const isLoggedIn = computed(() => loginService.isLoggedIn())

const errorLogin = ref('') as Ref<string>
const isErrorLogin = computed(() =>  (errorLogin.value>'') ? true : false)
const routeName = ref(route.name)
const message = ref('')

const loginSetup = () => {
  // loginInfo = userLogin.LoginInfo;
  routeName.value = route.name
  if (route.name == 'logout') {
    if (loginService.isLoggedIn()) {
      const logoutInfo = { username: loginService.getUserName() } as LogoutInfo
      loginService.logout(logoutInfo)
      message.value = 'Logged out.'
    } else {
      loginInfo.username = loginService.getUserName()
      loginService.clear()
      message.value = ''
    }
  }
}

const checkIsLoggedIn = (): Promise<boolean> => {
  // return new <boolean>
    return new Promise<boolean>((resolve, reject) => {
      const isLoggedIn = loginService.isLoggedIn()
      return isLoggedIn
  });
}

const login = async (): Promise<boolean> => {
  isLoading.value = true
  const response = await loginService.login(loginInfo)
  console.log( response)
  isLoading.value = false
  errorLogin.value = ''
  if (loginService.isLoggedIn()) {
    // loadAdmSettingsAndCardData()
    gotoStartPage()
  } else {
    message.value = loginResult.value.msg
    errorLogin.value = loginService.getErrorMsg()
  }
  return (loginResult.value) ? true : false
}

// const loadAdmSettingsAndCardData = async () => {
//   isLoading.value = true
//   const admSettings = await admService.getSettings()
//   const cards = await ccCardStore().getCards()
//   isLoading.value = false
// }

const gotoStartPage = () => {
  const startPage = loginService.getStartPage()
  console.log( 'gotoStartPage', startPage)
  router.push({ name: startPage })
}

const showMessage = computed(() : boolean => (message.value > '') ? true : false)
const pingResult = ref({})
const ping = async () => {
  pingResult.value = await admService.ping()
}

loginSetup()

</script>
