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
              <v-text-field v-model="myAuthRole.role" label="Role"> </v-text-field>
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

<script setup lang="ts">
import { ref, reactive } from "vue";
import commonService from "@/services/commonService";
import authService from "@/services/authService"
import EditSaveCancel from "@/components/common/EditSaveCancel.vue";
// import AuthRoleModel from "@/models/admin/AuthRoleModel";
import type AuthRole from "@/interfaces/admin/AuthRole";

// value: "AuthRoleForm",
const props = defineProps({
  authRole: Object,
  isReadOnly: {
    type: Boolean,
    default: false,
  },
});

const myAuthRole = reactive({} as AuthRole);
const readOnly = ref(false);
let msgBox = {};

let prevAuthRole = commonService.clone(props.authRole) as AuthRole;
myAuthRole.value = commonService.clone(props.authRole) as AuthRole;
readOnly.value = props.isReadOnly;

const editForm = () => {
  readOnly.value = false;
};

const saveForm = async () => {
  // console.log( 'form saveForm', this.myCcAccount);
  let id = myAuthRole.id ? myAuthRole.id : 0;
  let response = await authService.postAuthRole(id, this.myAuthRole);
  let bret = commonService.emitSaveForm(this, response);
  // console.log(bret, response);
  if (!bret) {
    msgBox.dialog = true;
    msgBox.prompt = ["Unable to save Role", ` ${response.rc}] ${response.msg}`];
  }
};

const cancelForm = () => {
  readOnly.value = true;
  let authRole = commonService.clone(this.prevAuthRole);
  // this.$emit("cancelForm", "AuthRoleForm", authRole);
};

const closeForm = () => {
  console.log(this);
  // this.$emit("cancelForm", "AuthRoleForm", this.myAuthRole);
};

const messageBoxClose = () => {
  msgBox.dialog = false;
};
</script>
<style scoped></style>
