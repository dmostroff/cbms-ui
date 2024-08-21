<template>
<v-layout justify-center>
  <v-flex xs4>
  <v-card elevation outlined >
    <v-card-title class="primary">
      {{ title }}
    </v-card-title>
    <v-card-text class="ma-4" :class="{ 'red--text': isError }">
      <div v-if="isPromptArray">
        <p v-for="(line, ii) in prompt" :key="ii">{{ line }}</p>
      </div>
      <div v-else>
        {{ prompt }}
      </div>
    </v-card-text>
    <v-card-actions justify="right">
      <v-spacer />
      <v-btn @click="close">Close</v-btn>
    </v-card-actions>
  </v-card>
  </v-flex>
</v-layout>
</template>

<script>
export default {
  name: "MessageBox",
  components: {},
  props: {
    title: String,
    prompt: [String, Array],
    isError: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    isPromptArray() {
      return Array.isArray(this.prompt);
    },
  },
  mounted() {},
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style lang="css" scoped>
.modal {
  background-color: rgba(0, 0, 0, 0.7);
}
</style>

