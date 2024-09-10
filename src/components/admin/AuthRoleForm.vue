<template>
  <v-form>
    <v-card>
      <v-card-header :md-elevation="2"> Auth Role </v-card-header>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="2" class="caption"> Id: {{ myAuthRole.id }} </v-col>
          </v-row>
          <v-row>
            <v-col cols="4">
              <v-text-field v-model="myAuthRole.role" label="Role">
              </v-text-field>
            </v-col> </v-row
          ><v-row>
            <v-col cols="8">
              <v-text-field v-model="myAuthRole.description" label="Description">
              </v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <EditSaveCancel
          :isReadOnly="readOnly"
          :isValid="isValid"
          @editForm="editForm"
          @saveForm="saveForm"
          @cancelForm="cancelForm"
          @closeForm="closeForm"
        ></EditSaveCancel>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import commonService from "@/services/commonService";
import authService from "@/services/authService";
import EditSaveCancel from "@/components/common/EditSaveCancel";
// import AuthRoleModel from "@/models/admin/AuthRoleModel";

export default {
  value: "AuthRoleForm",
  components: {
    EditSaveCancel,
  },
  props: {
    authRole: Object,
    isReadOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      prevAuthRole: {},
      myAuthRole: {},
      readOnly: false,
    };
  },
  computed: {},
  mounted() {
    this.prevAuthRole = commonService.clone(this.authRole);
    this.myAuthRole = commonService.clone(this.authRole);
    this.readOnly = this.isReadOnly;
  },
  methods: {
    editForm() {
      this.readOnly = false;
    },
    async saveForm() {
      // console.log( 'form saveForm', this.myCcAccount);
      let id = this.myAuthRole.id ? this.myAuthRole.id : 0;
      let response = await authService.postAuthRole(id, this.myAuthRole);
      let bret = commonService.emitSaveForm(this, response);
      // console.log(bret, response);
      if (!bret) {
        this.msgBox.dialog = true;
        this.msgBox.prompt = [
          "Unable to save Role",
          ` ${response.rc}] ${response.msg}`,
        ];
      }
    },
    cancelForm() {
      this.readOnly = true;
      let authRole = commonService.clone(this.prevAuthRole);
      this.$emit("cancelForm", "AuthRoleForm", authRole);
    },
    closeForm() {
      console.log(this);
      this.$emit("cancelForm", "AuthRoleForm", this.myAuthRole);
    },
    messageBoxClose() {
      this.msgBox.dialog = false;
    },
  },
  created() {},
};
</script>
<style scoped>
</style>