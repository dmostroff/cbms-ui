<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                Please contact the System Administrator.
            </v-col>
        </v-row>
        <v-row class="subtitle-1">
            <v-col cols="1">
                {{response.rc}}
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="6" align-start>
                {{response.msg}}
            </v-col>
            <v-col cols="1">
                <v-btn @click="ToggleMsg">{{ msg }}</v-btn>
            </v-col>
        </v-row>
        <v-row v-if="toggleBit" class="subtitle-2">
            <v-col>
                {{response.data}}
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
  name: "ErrorMessage",
  components: {},
  props: {
    response: Object,
  },
  data() {
    return {
        messages: ["More", "Less"],
        toggleBit: false,
    };
  },
  computed: {
    msg: function() { return this.messages[this.toggleBit ? 1 : 0]; }
  },
  mounted() {

  },
  methods: {
    ToggleMsg() { this.toggleBit = !this.toggleBit; }
  },
};
</script>


