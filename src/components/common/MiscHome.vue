<template>
  <v-card>
    <v-card-title
      >Miscellanious and Sundry, Diverse and Variegated
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>{{resp.data}}
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-layout>
        <v-flex v-for="item in items" :key="item.name">
          <v-btn @click="action(item)">{{item.prompt}}</v-btn>
        </v-flex>
      </v-layout>
    </v-card-actions>
  </v-card>
</template>

<script>
import misc from "@/services/miscService";
export default {
  name: "Misc",
  components: {},
  props: [],
  data() {
    return {
      items: [
        { name: "pingos", prompt: "Ping OS" },
        { name: "ping", prompt: "Ping" },
        { name: "version", prompt: "version" },
        { name: "site-map", prompt: "Site Map" },
      ],
      resp: "Select something",
    };
  },
  computed: {},
  mounted() {},
  methods: {
    async action(item) {
      this.resp = await misc.getData(item.name);
    },
  },
};
</script>

