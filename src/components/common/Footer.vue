<template>
  <v-row justify="center" no-gutters align-items="center"><v-col>
      <v-btn v-for="item in links" :key="item.prompt" color="white" text rounded class="my-2">
        <span @click="linkto(item.link)">{{ item.prompt }}</span>
      </v-btn>
    </v-col>
    <v-col class="caption" cols="1">
      <!-- <v-idle @idle="onidle" /> -->
    </v-col>
    <v-col class="caption" cols="1">
      {{ appversion }}
    </v-col>
    <v-col class="primary lighten-2 py-4 text-center white--text" cols="11">
      {{ new Date().getFullYear() }} — <strong>Ostroff Ent.</strong>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    links: [
      { prompt: 'Home', link: "home" },
      { prompt: 'About Us', link: 'aboutus' },
      { prompt: 'Contact Us', link: "home" },
    ],
    appversion: process.env.VUE_APP_VERSION
  }),
  methods: {
    linkto(name) {
      console.log("linkto", name, this.$router.currentRoute.path);
      this.$router.push({ name: name });
    },
    onidle() {
      alert("ou have been logged out.")
    },
    onremind(time) {
      // alert seconds remaining to 00:00
      alert(time);
    }
  },
}
</script>

