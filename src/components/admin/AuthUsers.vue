<template>
  <v-card>
    <beat-loader v-if="loading"></beat-loader>
    <v-card-title>
      <div v-if="msg" xs12>{{ msg }}</div>
      <div class="title">Users</div>
      <v-spacer></v-spacer>
      <div class="d-flex" @click="addItem">
        Add <v-icon>mdi-plus-circle-outline</v-icon>
      </div>
    </v-card-title>
    <v-card-text>
      <v-data-table title="Auth Users" :items="authUsers" :headers="headers">
        <template v-slot:[`item.created_at`]="{ item }">
          {{ formatDateTime(item.created_at) }}@
        </template>
        <template v-slot:[`item.is_superuser`]="{ item }">
          <v-switch
            v-model="item.is_supervisor"
            color="green"
            hide-details
            readonly
          ></v-switch>
        </template>
        <template v-slot:[`item.is_staff`]="{ item }">
          <v-switch
            v-model="item.is_staff"
            label=""
            color="green"
            hide-details
            readonly
          ></v-switch>
        </template>
        <template v-slot:[`item.is_active`]="{ item }">
          <v-switch
            v-model="item.is_active"
            label=""
            color="green"
            hide-details
            readonly
          ></v-switch>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card-text>
    <v-dialog v-model="editDialog">
      <AuthUserForm
        :authUser="authUser"
        :isReadOnly="isReadOnly"
        @editForm="editForm"
        @saveForm="saveForm"
        @cancelForm="cancelForm"
        @closeForm="closeForm"
      ></AuthUserForm>
    </v-dialog>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import commonService from "@/services/commonService";
import { formatDateTime } from "@/services/commonService";
import authService from "@/services/authService";
import BeatLoader from "@/components/common/Spinner.vue";
import AuthUserForm from "@/components/admin/AuthUserForm.vue";
import AuthUserModel from "@/models/admin/AuthUserModel";
import type AuthUser from "@/interfaces/admin/AuthUser";

// value: "AuthUsers",
const loading = ref(true);
const authUsers = ref([] as AuthUser[]);
const authUser = ref({} as AuthUser);
const msg = ref("");
const headers = [
  { id: 1, value: "id", text: "Id" },
  { id: 2, value: "first_name", text: "First Name" },
  { id: 3, value: "last_name", text: "Last Name" },
  { id: 4, value: "email", text: "Email" },
  { id: 5, value: "username", text: "Username" },
  { id: 6, value: "password", text: "Password" },
  { id: 7, value: "password_hint", text: "Password Hint" },
  { id: 8, value: "is_superuser", text: "Is Superuser" },
  { id: 9, value: "is_staff", text: "Is Staff" },
  { id: 10, value: "is_active", text: "Is Active" },
  { id: 11, value: "roles", text: "Roles" },
  { id: 12, value: "created_at", text: "Created At" },
  { id: 20, value: "actions", text: "Actions", sortable: false },
];
const editDialog = ref(false);
const isReadOnly = ref(true);

const getAuthUsers = async () => {
  loading.value = true;
  authUsers.value = await authService.getAuthUsers();
  loading.value = false;
};
const editItem = (item: AuthUser) => {
  authUser.value = item;
  isReadOnly.value = false;
  editDialog.value = true;
};
const addItem = () => {
  let myAuthUser = new AuthUserModel();
  // temp
  myAuthUser.last_name = "Washington";
  myAuthUser.first_name = "George";
  myAuthUser.email = "gw@potus.com";
  myAuthUser.is_supervisor = true;
  myAuthUser.is_staff = false;
  myAuthUser.is_active = true;
  myAuthUser.password_hint = "silver dollar";
  authUser.value = myAuthUser;

  isReadOnly.value = false;
  editDialog.value = true;
};
const editForm = () => {
  // console.log('editForm');
};

const saveForm = (newItem: AuthUser) => {
  console.log("save " + newItem.last_name);
  commonService.upsert(authUsers, newItem);
};

const cancelForm = (formName: string, item: AuthUser) => {
  if (formName === "AuthUserForm") {
    authUser.value = item;
  }
  editDialog.value = false;
};

const closeForm = () => {
  editDialog.value = false;
};

const formataDateTime = (dateTime: string) => {
  return formatDateTime(dateTime);
};

getAuthUsers();
</script>
<style scoped></style>
