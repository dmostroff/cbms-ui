<template>
  <v-card>
    <v-card-header :md-elevation="2">
      Auth User
    </v-card-header>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col><span class="subtitle-2">Id</span>:</v-col>
          <v-col>
            {{authUser.id}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Password</span>:</v-col>
          <v-col>
            {{authUser.password}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Last Login</span>:</v-col>
          <v-col>
            {{authUser.last_login}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Is Superuser</span>:</v-col>
          <v-col>
            {{authUser.is_superuser}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Username</span>:</v-col>
          <v-col>
            {{authUser.username}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">First Name</span>:</v-col>
          <v-col>
            {{authUser.first_name}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Last Name</span>:</v-col>
          <v-col>
            {{authUser.last_name}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Email</span>:</v-col>
          <v-col>
            {{authUser.email}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Is Staff</span>:</v-col>
          <v-col>
            {{authUser.is_staff}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Is Active</span>:</v-col>
          <v-col>
            {{authUser.is_active}}
          </v-col>
        </v-row><v-row>
          <v-col><span class="subtitle-2">Date Joined</span>:</v-col>
          <v-col>
            {{authUser.date_joined}}
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions md-alignment="right">
      <v-btn @click="editForm">Edit</v-btn>
      <v-btn @click="cancelForm">Cancel</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  value: "AuthUser",
  components: {
  },
  props: {
    authUser: Object
  },
  data() {
    return {
    };
  },
  computed: {},
  mounted() {},
  methods: {
    editForm() {
      this.$emit( "editAuthUserForm" )
    },
    cancelForm() {
      this.$emit( "cancelAuthUserForm" )
    }
  },
  created() {},
};
</script>
<style scoped>
</style>