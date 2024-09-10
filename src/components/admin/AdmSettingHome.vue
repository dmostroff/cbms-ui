<template>
  <v-card>
    <v-card-title>Admin Settings</v-card-title>
    <v-container>
      <v-row>
        <v-col cols="3">
          <v-list :dense="true" dark
          class="overflow-y-auto"
          max-height="300"
          >
            <v-list-item
              v-for="item in prefixes"
              :key="item.value"
              @click="setPrefix(item)"
              :class="{ secondary: item.value === currentPrefix.value }"
            >
              {{ item.text }}
            </v-list-item>
          </v-list>
        </v-col>
        <v-col>
          <AdmSettings
            :prefix="currentPrefix"
            :settings="settings"
          ></AdmSettings>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import admService from "@/services/admService";
// import BeatLoader from "@/components/common/Spinner";
import AdmSettings from "@/components/admin/AdmSettings";

export default {
  name: "AdmSettingHome",
  components: {
    // BeatLoader,
    AdmSettings,
  },
  props: [],
  data() {
    return {
      loading: false,
      response: {
        rc: 0,
        msg: null,
        data: [],
      },
      prefixSettings: [],
      admSettings: [],
      currentItem: null,
      currentPrefix: null,
      prefixes: [],
    };
  },
  computed: {
    settings() {
      if (!this.currentPrefix) {
        return [];
      }
      const prefix = this.currentPrefix.value;

      return this.admSettings.filter((val) => val.prefix === prefix);
    },
  },
  mounted() {
    this.getAdmSettings();
  },
  created() {},
  methods: {
    async getAdmSettings() {
      this.loading = true;
      this.response = await admService.getAdmSettings();
      // console.log(this.response);
      if ("rc" in this.response && this.response.rc == 1) {
        this.admSettings = this.response.data;
        this.prefixes = this.admSettings
          .filter((val) => val.prefix === "__prefix__")
          .map((val) => {
            return { text: val.keyvalue, value: val.keyname };
          });
        // const prefixes = this.admSettings.filter( (item) => item.prefix === '__prefix__');
        this.currentPrefix =
          this.prefixes.length > 0 ? this.prefixes[0] : {};
      }
      this.loading = false;
    },
    setPrefix(prefix) {
      this.currentPrefix = prefix;
    },
    // selectPrefix( prefix) {
    //   this.curPref = prefix
    // },
  },
};
</script>
<style>
.xxv-list {
  height: 300px; /* or any height you want */
  overflow-y: auto;
}
.selected {
  background: red !important;
  color: purple;
}
</style>

