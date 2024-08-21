<template>
  <div>
    <v-text-field
    autocomplete="off"
    :value="userPassword"
    :label="label"
    :hint="hint"
    :append-icon="value ? 'mdi-eye' : 'mdi-eye-off'"
    @click:append="() => (value = !value)"
    :type="value ? 'password' : 'text'"
    :rules="[rules.password]"
    :readonly="isReadOnly"
    @input="(_) => (userPassword = _)"
    @blur="passwordDone"
  ></v-text-field>
{{pwd}}
  </div>
</template>
<script>
const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/;
 // autocomplete="current-password"
export default {
  name: "Password",
  data: () => ({
    userPassword: null,
    valid: true,
    value: true,
  }),
  props: {
    pwd: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: "Enter password",
    },
    tag: {
      type: String,
      default: "password",
    },
    isReadOnly: {
      type: Boolean,
      default: false,
    },
    hasRule: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hint() {
      return ( pattern.test(this.userPassword)) ? "Password is strong." : "Enter a strong password.";
    },
    rules() {
      return {
        required: (value) => !!value || "Required.",
        password: (value) => {
          const pattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{8,})/;
          return (
            !this.hasRule ||
            pattern.test(value) ||
            "Min. 8 characters with at least one capital letter, a number and a special character."
          );
        },
      };
    },
  },
  methods: {
    passwordDone() {
      this.$emit("passwordDone", this.userPassword, this.tag);
    },
  },
  created() {
    this.userPassword = "No direction home";
  },
  mounted() {
    this.userPassword = this.pwd;
  }
};
</script>