<template>
  <div>
    <beat-loader v-if="loading"></beat-loader>
    <div v-if="authRole.msg" xs12>\{ authRole.msg \}</div>
    <div v-else>
    <v-data-table
      title="Auth Roles"
      :items="response.data"
      :headers="headers"
    >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
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

<script>
import commonService from "@/services/commonService";
import authService from "@/services/authService";
import BeatLoader from "@/components/common/Spinner.vue";
import AuthRoleForm from "@/components/admin/AuthRoleForm.vue";

export default {
  value: "AuthRoles",
  components: {
    BeatLoader,
    AuthRoleForm

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
      authRole: {},
      headers: [
      { id: 1, value: 'id', text: 'Id' }
      , { id: 2, value: 'role', text: 'Role' }
      , { id: 3, value: 'description', text: 'Description' }
      , { id: 20, value: 'actions', text: 'Actions', sortable: false}
      ],
      editDialog: false,
    };
  },
  computed: {},
  mounted() {
    this.getAuthRoles();
  },
  methods: {
    async getAuthRoles() {
        this.loading = true;
        this.response = await authService.getAuthRoles();
        this.loading = false;
    },
    editItem(item) {
      this.authRole = item;
      this.editDialog = true;
    },
    async saveForm(newItem) {
      this.editDialog = false;
      let findItem = this.cards.filter( item => item.id === newItem.id);
      if( findItem && findItem.length > 0) {
        findItem[0] = commonService.clone( newItem);
      }
    },
    cancelForm(formName, item) {
      if( formName === "AuthRoleForm") {
        console.log("cancelForm", item);
        this.authRole = item;
      }
      this.editDialog = false;
    },
  },
  created() {},
};
</script>
<style scoped>
</style>