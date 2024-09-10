<template>
  <v-form>
    <v-card>
      <v-card-title :md-elevation="2">
        <div v-if="authUser.id > 0">
          Edit {{ authUser.first_name }}, {{ authUser.first_name }}
        </div>
        <div v-else>Add User</div>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="2" class="caption"> Id: {{ authUser.id }} </v-col>
            <v-spacer></v-spacer>
            <v-col cols="3" class="caption" v-if="authUser.created_at > ''">
              Created on: {{ formatDateTime(authUser.created_at) }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-text-field v-model="authUser.first_name" label="First Name">
              </v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field
                v-model="authUser.last_name"
                label="Last Name"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-text-field v-model="authUser.username" label="Username">
              </v-text-field>
            </v-col>
            <v-col cols="4">
              <v-text-field
                v-model="authUser.email"
                label="Email"
                :readonly="isReadOnly"
              >
              </v-text-field>
            </v-col>
            <v-col cols="5">
              <v-text-field
                v-model="authUser.password_hint"
                label="Password Hint"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="3">
              <v-switch
                v-model="authUser.is_supervisor"
                label="Is supervisor"
                color="green"
                hide-details
                :readonly="isReadOnly"
              ></v-switch>
            </v-col>
            <v-col cols="3">
              <v-switch
                v-model="authUser.is_staff"
                label="Is Staff"
                color="green"
                :value="true"
                hide-details
                :readonly="isReadOnly"
              ></v-switch>
            </v-col>
            <v-col cols="3">
              <v-switch
                v-model="authUser.is_active"
                label="Is Active"
                color="green"
                :value="true"
                hide-details
                :readonly="isReadOnly"
              ></v-switch>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <EditSaveCancel
          :isReadOnly="isReadOnly"
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
// import AuthUserModel from "@/models/admin/AuthUserModel";

export default {
  value: "AuthUserForm",
  components: {
    EditSaveCancel,
  },
  props: {
    authUser: Object,
    isReadOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      myAuthUser: {},
      prevAuthUser: {},
      readOnly: false,
      msgBox: {
        dialog: false,
        title: "User",
        prompt: "",
      },
    };
  },
  computed: {},
  mounted() {
    this.myAuthUser = commonService.clone( this.authUser);
    this.prevAuthUser = commonService.clone( this.authUser);
    this.readOnly = this.isReadOnly;
  },
  methods: {
    formatDateTime(datetime) {
      return commonService.formatDateTime(datetime);
    },
    editForm() {
      this.$emit( "readonly", false);
    },
    async saveForm() {
      // console.log( 'form saveForm', this.myCcAccount);
      let id = this.authUser.id ? this.authUser.id : 0;
      let response = await authService.postAuthUser(id, this.authUser);
      let bret = commonService.emitSaveForm(this, response);
      // console.log(bret, response);
      if (!bret) {
        this.msgBox.dialog = true;
        this.msgBox.prompt = [
          "Unable to save User",
          ` ${response.rc}] ${response.msg}`,
        ];
      }
    },
    cancelForm() {
      this.isReadOnly = true;
      let authUser = commonService.clone(this.prevAuthUser);
      this.$emit("cancelForm", "AuthUserForm", authUser);
    },
    closeForm() {
      console.log(this);
      this.$emit("cancelForm", "AuthUserForm", this.authUser);
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