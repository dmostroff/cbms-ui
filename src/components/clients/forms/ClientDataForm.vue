<template>
  <div>
    <div>
      ClientDataForm !{{ id }}!?{{ currentForm }}? <b>Section</b
      >{{ myClientStore.SectionName }}<b>IsValid</b>{{ isValid }}
      <b>ClientStore isValid</b>
      <div v-if="myClientStore.item.isValid">
        {{ myClientStore.item.isValid() }}
      </div>
      <div>{{ route.fullPath }}</div>
      <div>{{ randkey }}</div>
    </div>
    <div v-if="isLoading"><v-spinner-ball color="blue-3" /></div>
    <div v-if="!isValid">No Data</div>
    <div v-if="true">
      <b>Original:</b>{{ myClientItem }}
      <v-separator color="brown" size="1em" />
      <b>Item:</b>{{ myClientStore.Item }}
      <v-separator size="1em" color="red" />
      <b>sectionName</b>{{ sectionName }} <b>IsValid</b>{{ isValid }}
    </div>
    <v-card class="v-gutter-x-md">
      <v-card
        class="row justify-start items-center text-h6 text-white bg-blue-3"
      >
        <div class="col-3">{{ title }}</div>
        <div v-if="itemId > 0" class="col-1 text-caption">Id: {{ itemId }}</div>
        <div class="col"></div>
        <div
          class="col-2 text-caption text-weight-thin"
          v-if="myClientStore.Item.recorded_on"
        >
          Recorded on: {{ myClientStore.Item.recorded_on }}
        </div>
        <div class="col-2 text-caption text-weight-thin">
          Client id/code: {{ myClientPerson.id }} ::
          {{ myClientPerson.client_code }}
        </div>
      </v-card>
      <router-view :key="randkey"></router-view>
      <v-separator class="full-width" />
      <v-card-actions>
        <EditSaveCancel
          :isValid="isValid"
          @buttonClick="saveCancelClick"
        ></EditSaveCancel>
      </v-card-actions>
    </v-card>
    <!-- <v-dialog v-model="msgBox.dialog" class="v-ma-md">
    <MessageBox
      :title="msgBox.title"
      :prompt="msgBox.prompt"
      :isError="true"
      @close="msgBox.dialog = false"
    />
  </v-dialog>
  --></div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch, markRaw } from "vue";
import { useRouter, useRoute } from "vue-router";
import { clientStore } from "@/stores/clientStore";
import ccd from "@/stores/clientComponentData";
import EditSaveCancel from "src/components/common/EditSaveCancel.vue";

const router = useRouter();
const route = useRoute();
const randkey = ref(0);
const myClientStore = clientStore();
const sectionName = ref(myClientStore.SectionName);
let myClientItem = reactive({});
let myClientPerson = myClientStore.ClientPerson;
const itemId = ref(0);
const isLoading = ref(false);
const isValid = computed(() => {
  return myClientStore && myClientStore.item && myClientStore.item.isValid
    ? myClientStore.item.isValid()
    : false;
});
const emits = defineEmits(["onCancel", "savedItem"]);

onMounted(() => {
  console.log("onMounted", myClientStore.CurrentSection);
  getClientSectionData(props.id);
});

const props = defineProps({
  id: {
    type: Number,
    default: 0,
  },
});

watch(
  () => props.id,
  (newValue) => {
    console.log("watch props", newValue, props.id);
    getClientSectionData(newValue);
  }
);

const title = ref(ccd.getTitle(myClientStore.SectionName));
const currentForm = ref(ccd.getRouteName(myClientStore.SectionName));

const getClientSectionData = (id) => {
  itemId.value = id;
  if (id == 0) {
    return;
  } else {
    isLoading.value = true;
    myClientStore.setItemById(id);
    console.log("getClientId", id, myClientStore.Item);
  }
  //myClientStore.setIsValid(myClientItem.IsValid);
  Object.assign(myClientItem, myClientStore.Item);
  // currentForm.value = componentForms[myClientStore.SectionName];
  // console.log(myClientStore.SectionName, currentForm.value);
  // currentForm.value.props.id = id;
  myClientPerson = myClientStore.ClientPerson;
  currentForm.value = ccd.getRouteName(myClientStore.SectionName);
  const childRoute = currentForm.value;
  console.log("Child Route", id, childRoute);
  randkey.value = Math.floor(Math.random() * 10000);
  router.push({ name: childRoute, params: { id: id } });
  isLoading.value = false;
};

const resetForm = () => {
  Object.assign(myClientStore.Item, myClientItem);
};

const addNewClientItem = () => {
  myClientStore.setItemById(-1);
  myClientItem = myClientStore.Item;
};

const saveCancelClick = async (action) => {
  if (action == "save") {
    const postUrl = ccd.getPostUrl(myClientStore.SectionName);
    isLoading.value = true;
    const resp = await myClientStore.saveData(postUrl, myClientStore.Item);
    isLoading.value = false;
    emits("savedItem");
  } else if (action == "cancel") {
    resetForm();
    emits("onCancel");
  }
};
</script>
