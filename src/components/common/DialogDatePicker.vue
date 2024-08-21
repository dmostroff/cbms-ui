<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    persistent
    width="290px"
    transition="dialog-top-transition"
  ><!--    :return-value.sync="mydate"-->
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="displayDate"
        :label="label"
        prepend-icon="mdi-calendar"
        :readonly="true"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="mydate"
      scrollable
      :readonly="isReadOnly"
      >
      {{mydate}}
      <v-spacer></v-spacer>
      <v-btn text color="primary" @click="modal = false"> Cancel </v-btn>
      <v-btn text color="primary" @click="save(mydate)"> OK </v-btn><!-- $refs.dialog.save(mydate) -->
    </v-date-picker>
  </v-dialog>
</template>
<script>
// import commonService from "@/services/commonService";
import { format, parseISO } from 'date-fns'

export default {
  name: "DialogDatePicker",
  props: {
    label: String,
    tag: {
      type: String,
      default: ""
    },
    date: {
      type: String,
      default: null
    },
    isReadOnly: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    date: function( val) { this.mydate = val },
  },
  data: () => ({
    modal: false,
    mydate: null,
  }),
  computed: {
    displayDate() {
      return (this.mydate) ? format( parseISO( this.mydate), 'M/d/yyyy') : '';
    }
  },
  mounted() {
    if( this.date) {
      this.mydate = JSON.parse(JSON.stringify(this.date))
    }
  },

  methods: {
    // formatDate() {
    //   this.$nextTick(() => {
    //     this.mydate = commonService.formatDateInput(this.maydate);
    //   });
    // },
    save(adate) {
      this.modal = false;
      // console.log( this.tag, adate);
      this.$emit("datepicker", this.tag, adate);
    },
    blur() {
      // console.log( 'blur', this.mydate)
    }
  },
};
</script>


