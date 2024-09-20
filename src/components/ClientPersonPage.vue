<template>
  <v-container class="justify-center items-center">
    <div>
      <BreadCrumbs
        :level="breadCrumbLevel"
        @sectionClick="sectionClick"
        @showClientDataList="showList"
      ></BreadCrumbs>
      <div>
        <b>ClientID</b> {{ myClientId }} <b>Ilk</b> {{ ilk }} <b>sectionName</b
        >{{ sectionName }} <b>clientStore:</b> {{ myClientStore.SectionName }}
        <b>Section Title</b> {{ myClientStore.SectionTitle }} <b>ChildRoute:</b>
        {{ childRoute }} <b>Filter</b> {{ myClientStore.SectionFilter }} <b>Filters</b
        >{{ myClientStore.Filters }} <b>IsValid</b>{{ myClientStore.ItemIsValid
        }}<q-icon name="pan_tool" />
      </div>
      <div v-if="false">
        {{ clientData }}
      </div>
      <div v-if="errorMessage" class="bg-red-2">
        {{ errorMessage }}
      </div>
      <div v-if="isLoading">
        Loading...
        <q-spinner-dots color="primary" size="3em" />
      </div>
      <div v-else>
        <div>{{ fetchResponse }}</div>
        <div class="row justify-center bg-yellow-3 mr-2"></div>
        <div class="row justify-start text-center wrap bg-blue-1">
          <!-- <div class="col-2">
            <q-btn color="secondary" @click="goToClientList()">Clients</q-btn>
          </div> -->
          <div class="col-12">
            <ClientPersonHeading />
          </div>
        </div>
        <div class="row justify-center bg-blue-2">
          <!-- <div class="col-2 bg-orange-4">
            <ClientLeftNav @sectionClick="sectionClick" />
            {{ sectionName }}
          </div> -->
          <div class="col-12">
            <ClientCreditSummary />
          </div>
        </div>
        <div class="row justify-start q-mx-sm">
          <div class="col-12">
            <div v-if="ilk == 'list'">
              <ClientDataList
                :key="sectionName"
                :clientSectionName="sectionName"
                @editItem="editItem"
                @deleteItem="deleteItem"
                @addItem="addItem"
              />
            </div>
            <div v-if="ilk == 'item'">
              <ClientDataForm
                :key="itemId"
                :id="itemId"
                @savedItem="savedItem"
                @onCancel="cancelDataForm"
              ></ClientDataForm>
            </div>
            <div v-if="ilk == 'person'">
              <ClientPersonForm></ClientPersonForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import clientService from "@/services/clients/ClientService";
import ClientPersonHeading from "@/components/clients/ClientPersonHeading.vue";
import ClientCreditSummary from "@/components/clients/ClientCreditSummary.vue";
import BreadCrumbs from "@/components/framework/BreadCrumbs.vue";
import ClientDataList from "@/components/clients/ClientDataList.vue";
import ccd from "@/stores/clientComponentData";
import ClientPersonForm from "@/components/clients/forms/ClientPersonForm.vue";
import ClientDataForm from "@/components/clients/forms/ClientDataForm.vue";

const router = useRouter();
const route = useRoute();
const myClientMetaData = ccd.getClientComponentData("client");
const fetchResponse = ref("");
const clientData = myClientStore.client;
const sectionName = ref("person");
const title = ref(ccd.getTitle("client"));
const isLoading = ref(false);
const ilk = ref(null);
const breadCrumbLevel = ref(3);
const childRoute = ref("??");
const showLeftNav = ref(true);
const itemId = ref(0);
const errorMessage = ref(null);
let sectionKey = "";

const props = defineProps({
  clientid: number,
});
const myClientId =
  typeof route.params == "object" && "clientid" in route.params
    ? route.params.clientid
    : 0;

const setIlk = (newIlk: string) => {
  ilk.value = newIlk;
};
const sectionClick = (aSectionName: string) => {
  // console.log("PersonPage " + aSectionName);
  sectionName.value = aSectionName;
  clientService.setSection(aSectionName);
  childRoute.value = ccd.getChildRoute(aSectionName);
  clientService.setSectionTitle(myClientMetaData["title"]);
  title.value = ccd.getTitle(aSectionName);
  setIlk(myClientStore.SectionName == "person" ? "person" : "list");
  showLeftNav.value = false;
  breadCrumbLevel.value = 3;
  console.log(childRoute.value, myClientStore.SectionName, title.value);
};

const getClient = async (id: number) => {
  isLoading.value = true;
  try {
    const resp = await getClient(route.params.clientid);
    console.log("on Mounted!!!", myClientStore.SectionName);
    sectionClick(myClientStore.SectionName);
  } catch (err) {
    console.error(err);
    errorMessage.value = err;
  }
  isLoading.value = false;
};

const currentTab = computed(() => {
  return tabItems[this.currentTabIndex];
});

const isCurrentTab = computed((item) => {
  return item && "value" in item ? item.value == currentTab.value : false;
});

const editItem = (itemid) => {
  // alert("editItem" + sectionName.value + ":" + itemid);
  itemId.value = itemid;
  breadCrumbLevel.value = 4;
  setIlk("item");
};

const addItem = () => {
  editItem(-1);
};

const deleteItem = async (itemId) => {
  const resp = await myClientStore.deleteData(
    ccd.getDeleteUrl(sectionName.value),
    itemId
  );
  getClient(route.params.clientid);
};

const showList = () => {
  breadCrumbLevel.value = 3;
  setIlk("list");
};

const showClientSections = () => {
  showLeftNav.value = !showLeftNav.value;
};

const goToClientList = () => {
  router.push({ name: "clients" });
};

const goHome = () => {
  router.push({ name: "home" });
};

const savedItem = async () => {
  const resp = await getClient(route.params.clientid);
  console.log("savedItem", resp);
  showList();
};

const cancelDataForm = () => {
  showList();
};
</script>
<style></style>
