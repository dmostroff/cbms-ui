<template>
<div>
  <v-navigation-drawer 
    v-model="displayMenu" absolute temporary
    @transitioned="toggleLeftNav" >
    <v-list-item v-if="title">
      <v-list-item-content>
        <v-list-item-title>
          {{ title }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item v-for="(item, index) in menuItems" :key="index">
      <router-link v-if="item.link" :to="item.link">{{
        item.prompt
      }}</router-link>
      <v-list-item-title v-else>{{ item.prompt }}</v-list-item-title>
    </v-list-item>
  </v-navigation-drawer>
</div>
</template>

<script>
export default {
  name: "LeftNav",
  components: {},
  props: {
    title: {
      type: String,
      default: "Select",
    },
    showMenuItems: {
      type: Array,
      default: () => [
        {
          prompt: "Home",
          link: { name: "home" },
        },
        {
          prompt: "Credit Summary",
          link: { name: "creditsummary" },
        },
        {
          prompt: "Clients",
          link: { name: "clientx" },
        },
      ],
    },
  },
  data() {
    return {
      displayMenu: false,
      menuItems: [
        {
          prompt: "Home",
          link: { name: "home" },
        },
        {
          prompt: "Credit Summary",
          link: { name: "creditsummary" },
        },
        {
          prompt: "Clients Credit Cards",
          link: { name: "ccaccountshome" },
        },
        {
          prompt: "Clients",
          link: { name: "clients" },
        },
        {
          prompt: "Credit Cards",
          link: { name: "cchome" },
        },
        {
          prompt: "Admin",
          link: { name: "adminhome" },
        },
        {
          prompt: "Misc",
          link: { name: "mischome"},
        }
      ],
    };
  },
  computed: {},
  mounted() {
    this.$root.$on( 'toggleLeftNav', data => {
      if( data === data) {
        this.displayMenu = !this.displayMenu;
      }
    });
  },
  methods: {
    toggleLeftNav() {
      this.$root.$emit( "toggleLeftNav", this.displayMenu)
    }
  },
};
</script>
