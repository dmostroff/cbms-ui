<template>
  <v-list>
    <v-list-item v-if="title > ''">{{ title }}</v-list-item>
    <v-list-item v-for="(item, index) in showMenuItems" :key="index">
      <router-link v-if="item.link" :to="item.link">{{item.prompt}}</router-link>
      <v-list-item-title v-else>{{ item.prompt }}</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script>
import userService from "@/services/userService";

export default {
  name: "MenuDisplay",
  components: {},
  props: {
    title: {
      type: String,
      default: "",
    },
    menuItems: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showMenu: {},
      showMenuItems: [],
    };
  },
  computed: {},
  methods: {
    setShowMenuItems: function () {
      let menuItems = this.menuItems.filter((item) =>
        userService.canAccess(item.link.name)
      );
      return menuItems;
    },
  },
  mounted() {
    this.showMenuItems = this.setShowMenuItems();
  },
  updated() {},
  destroyed() {},
};
</script>

