<template>
  <v-container>
    <v-row>
      <v-col xs12>
        <v-tabs
          v-model="currentItem"
          background-color="secondary"
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

<script>

export default {
  name: "TabsContainer",
  components: {},
  props: {
      tabItems: {
          type: Array,
          default: () => [],
      }
  },
  data() {
    return {
      currentItem: 0,

    };
  },
  computed: {
    currentComponent: function() {
      return this.tabItems[this.currentItem].component
    },
  },
  mounted() {},
  methods: {},
  created() {},
};
</script>
<style scoped>
</style>