<template>
  <v-card>
    <beat-loader v-if="loading"></beat-loader>
    <v-card-title>
    <div v-if="msg" xs12>{{ msg }}</div>
    <div class="title">Users</div>
      <v-spacer></v-spacer>
      <div class="d-flex" @click="addItem">Add <v-icon>mdi-plus-circle-outline</v-icon></div>
    </v-card-title>
    <v-card-text>
    <v-data-table
      title="Auth Users"
      :items="authUsers"
      :headers="headers"
    >
        <template v-slot:[`item.created_at`]="{ item }">
          {{formatDateTime(item.created_at)}}@
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
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
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

<script>
import commonService from "@/services/commonService";
import authService from "@/services/authService";
import BeatLoader from "@/components/common/Spinner.vue";
import AuthUserForm from "@/components/admin/AuthUserForm.vue";
import AuthUserModel from "@/models/admin/AuthUserModel"

export default {
  value: "AuthUsers",
  components: {
    BeatLoader,
    AuthUserForm,
  },
  props: [],
  data() {
    return {
      loading: true,
      response: {
        rc: 0,
        msg: null,
        data: []
      },
      authUsers: [],
      authUser: {},
      msg: null,
      headers: [
      { id: 1, value: 'id', text: 'Id' }
      , { id: 2, value: 'first_name', text: 'First Name' }
      , { id: 3, value: 'last_name', text: 'Last Name' }
      , { id: 4, value: 'email', text: 'Email' }
      , { id: 5, value: 'username', text: 'Username' }
      , { id: 6, value: 'password', text: 'Password' }
      , { id: 7, value: 'password_hint', text: 'Password Hint' }
      , { id: 8, value: 'is_superuser', text: 'Is Superuser' }
      , { id: 9, value: 'is_staff', text: 'Is Staff' }
      , { id: 10, value: 'is_active', text: 'Is Active' }
      , { id: 11, value: 'roles', text: 'Roles' }
      , { id: 12, value: 'created_at', text: 'Created At' }
      , { id: 20, value: 'actions', text: 'Actions', sortable: false}
      ],
      editDialog: false,
      isReadOnly: true,
    };
  },
  computed: {},
  mounted() {
    this.getAuthUsers();
  },
  methods: {
    async getAuthUsers() {
        this.loading = true;
        this.response = await authService.getAuthUsers();
        if( 'rc' in this.response) {
          if( this.response.rc === 1 && 'data' in this.response) {
            this.authUsers = this.response.data;
          } else {
            this.msg = "Please contact system administrator";
          }
        }
        this.loading = false;
    },
    editItem(item) {
      this.authUser = item;
      this.isReadOnly = false;
      this.editDialog = true;
    },
    addItem() {
      this.authUser = new AuthUserModel();
      // temp
      this.authUser.last_name = 'Washington';
      this.authUser.first_name = 'George';
      this.authUser.email = 'gw@potus.com';
      this.authUser.is_supervisor = true;
      this.authUser.is_staff = false;
      this.authUser.is_active = true;
      this.authUser.password_hint = 'silver dollar';

      this.isReadOnly = false;
      this.editDialog = true;
    },
    editForm() {
      // console.log('editForm');
    },
    saveForm( newItem) {
      console.log( 'save ' + newItem.last_name);
      commonService.upsert( this.authUsers, newItem);
    },
    cancelForm( formName, item) {
      if( formName === "AuthUserForm") {
        this.authUser = item;
      }
      this.editDialog = false;
    },
    closeForm() {
      this.editDialog = false;
    },
    formatDateTime( dateTime) {
      return commonService.formatDateTime( dateTime);
    }
  },
  created() {},
};
</script>
<style scoped>
</style>