<template>
  <div>
    <beat-loader v-if="loading"></beat-loader>
    <div v-if="authRole.msg" xs12>\{ authRole.msg \}</div>
    <div v-else>
      <v-data-table title="Auth Roles" :items="authRoles" :headers="headers">
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </div>
    <v-dialog v-model="editDialog">
      <AuthRoleForm
        :authRole="authRole"
        @cancelForm="cancelForm"
        @saveForm="saveForm"
      ></AuthRoleForm>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import commonService from "@/services/commonService";
import authService from "@/services/authService";
import BeatLoader from "@/components/common/Spinner.vue";
import AuthRoleForm from "@/components/admin/AuthRoleForm.vue";
import type AuthRole from "@/interfaces/admin/AuthRole"

// value: "AuthRoles",
const loading = ref(false);
const authRole = ref({} as AuthRole);
const authRoles = ref([] as AuthRole[]);
const headers = [
  { id: 1, value: "id", text: "Id" },
  { id: 2, value: "role", text: "Role" },
  { id: 3, value: "description", text: "Description" },
  { id: 20, value: "actions", text: "Actions", sortable: false },
];
const editDialog = ref(false);

const getAuthRoles = async () => {
  loading.value = true;
  authRoles.value = await authService.getAuthRoles();
  console.log(authRoles.value);
  loading.value = false;
}

const editItem = (item: AuthRole) => {
  authRole.value = item;
  editDialog.value = true;
}

const saveForm = async (newItem: AuthRole) => {
  editDialog.value = false;
  let findItem = authRoles.value.filter((item: AuthRole) => item.id === newItem.id);
  if (findItem && findItem.length > 0) {
    findItem[0] = commonService.clone(newItem);
  }
}

const cancelForm = (formName: string, item: AuthRole) => {
  if (formName === "AuthRoleForm") {
    console.log("cancelForm", item);
    authRole.value = item;
  }
  editDialog.value = false;
}

getAuthRoles();
</script>
<style scoped></style>
