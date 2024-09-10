<template>
  <v-container>
    <v-data-table :caption="prefixText" :items="settings" :headers="headers">
      <template v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="showAdmSetting(item)">
          mdi-details
        </v-icon>
        <v-icon small class="mr-2" @click="editAdmSetting(item)">
          mdi-pencil
        </v-icon>
        <v-icon small class="mr-2" @click="deleteAdmSetting(item)">
          mdi-delete
        </v-icon>
        <!-- <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon> -->
      </template>
    </v-data-table>
    <v-dialog v-model="dialogDetail">
      <AdmSettingDetail
        :admSetting="admSetting"
        @editForm="editAdmSettingForm"
        @cancel="cancelAdmSettingDetail"
      ></AdmSettingDetail>
    </v-dialog>
    <v-dialog v-model="dialogDetailEdit">
      <AdmSettingForm
        :admSetting="admSetting"
        @saveForm="saveForm"
        @cancel="cancelAdmSettingForm"
      ></AdmSettingForm>
    </v-dialog>
  </v-container>
</template>

<script>
import admService from "@/services/admService";

import AdmSettingDetail from "@/components/admin/AdmSettingDetail";
import AdmSettingForm from "@/components/admin/AdmSettingForm";

export default {
  name: "AdmSettings",
  components: {
    AdmSettingDetail,
    AdmSettingForm,
  },
  props: {
    prefix: Object,
    settings: Array,
  },
  // watch: {
  //   settings: function (newValue, oldValue) {
  //     console.log("newValue: %s, previousValue: %s", newValue, oldValue);
  //     this.admSettings = newValue;
  //   },
  // },
  data() {
    return {
      response: {
        rc: 0,
        msg: null,
        data: [],
      },
      headers: [
        { id: 1, value: "id", text: "Id" },
        // , { id: 2, value: 'prefix', text: 'Prefix' }
        { id: 3, value: "keyname", text: "Keyname" },
        { id: 4, value: "keyvalue", text: "Keyvalue" },
        { id: 5, value: "display_rank", text: "Display Rank" },
        { id: 8, value: "actions", text: "Actions" },
      ],
      admPrefix: "no defined",
      admSettings: [],
      admSetting: {},
      dialogDetail: false,
      dialogDetailEdit: false,
    };
  },
  computed: {
    prefixText() {
      return (this.prefix) ? this.prefix.text : "";
    }
  },
  mounted() {
    this.admSettings = this.settings;
    this.admPrefix = this.prefix;
  },
  methods: {
    editAdmSetting(item) {
      this.dialogDetailEdit = true;
      this.admSetting = item;
    },
    showAdmSetting(item) {
      this.dialogDetail = true;
      this.admSetting = item;
    },
    deleteAdmSetting(item) {
      return item;
    },
    async saveForm(item) {
      this.dialogDetailEdit = false;
      const response = (this.admSetting = await admService.postAdmSetting(
        item
      ));
      console.log(response);
      if ("rc" in response && response.rc === 1) {
        this.admSetting = response.data;
      }
    },
    editAdmSettingForm() {
      this.dialogDetail = false;
      this.dialogDetailEdit = true;
    },
    cancelAdmSettingDetail() {
      this.dialogDetail = false;
    },
    cancelAdmSettingForm() {
      this.dialogDetailEdit = false;
    },
  },
  created() {},
};
</script>
<style scoped>
</style>