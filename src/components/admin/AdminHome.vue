<template>
  <v-container>
    <v-row>
      <v-col xs12>
        <v-tabs
          v-model="currentItem"
          background-color="primary"
        >
          <v-tab v-for="item in tabItems" :key="item.value">
            {{ item.text }}
          </v-tab>
        </v-tabs>
      </v-col>
    </v-row>
    <v-row align="center">
      <v-col cols="12">
        <component :is="currentComponent"></component>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
// import userService from "@/services/userService";
import AboutUs from '@/components/common/AboutUs.vue'
// import AdmSettingHome from '@/components/admin/AdmSettingHome.vue'
// import AuthUsers from '@/components/admin/AuthUsers.vue'
// import AuthRoles from '@/components/admin/AuthRoles.vue'

const loading = ref(false)
    // response: {
    //   rc: 0,
    //   msg: null,
    //   data: [],
    // },
const authUser = {}
const menuTitle:string = "Admin"
const currentItem = ref(0)
const tabItems = [
      { text: "Roles", value: "authroles", component: AboutUs },
      { text: "Users", value: "adminusers", component: AboutUs },
      { text: "Settings", value: "admsettings", component: AboutUs },
    ]

    // const tabItems = [
    //   { text: "Roles", value: "authroles", component: AuthRoles },
    //   { text: "Users", value: "adminusers", component: AuthUsers },
    //   { text: "Settings", value: "admsettings", component: AdmSettingHome },
    // ]
const currentComponent = computed(() => {
      return tabItems[currentItem.value].component
    })

</script>
<style scoped>
</style>