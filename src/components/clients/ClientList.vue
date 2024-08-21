<template>
  <div>
    <div class="text-caption" v-if="true">
      <b>myClientStore</b>{{ myClientStore.SectionName }} : <b>SectionName:</b>: {{ sectionName }}
      <b>Child Route</b>:{{ myChildRoute }} <b>showData</b>:{{ showData }} <b>showDetail</b>:
      {{ showDetail }} <b>Item Id</b>: {{ itemId }}
    </div>
    <div v-if="true"><b>dataRows</b>{{ dataRows }}</div>
    <div v-if="true"><b>Route</b>{{ route.name }} <b>RouteName</b> {{ routeName }}</div>
    <div class="row text-warning" v-if="errorMessage">{{ errorMessage }}</div>

    <div v-if="showData">
      <v-data-table
        :title="title"
        :items="dataRows"
        :headers="columns"
        :filter="filter"
        :filter-method="filterChange"
        :header-class="headerrow"
        row-key="name"
      >
        <template v-slot:top>
          <div class="row justify-start full-width">
            <div class="col-3 text-h4">{{ title }}</div>
            <div class="col-4"><v-space /></div>
            <div class="col-1" @click="addItem"><v-icon name="add_circle" size="md" /> Add</div>
            <v-input v-model="filter" label="Filter" class="col-4"></v-input>
          </div>
        </template>
        <template v-slot:body-cell-actions="props">
          <v-td :props="props">
            <v-icon name="edit" @click="editItem(props.row)" class="v-mx-md" />
            <v-icon name="delete" @click="deleteItem(props.row)" class="v-mx-md" />
          </v-td>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ccd from '@/stores/ClientComponentData'
import clientService from '@/services/clients/ClientService'
import clientStore from '@/stores/ClientStore'

const emit = defineEmits(['editItem', 'addItem', 'deleteItem'])
const myClientStore = clientStore()
const postUrl = ref('unknown')
const title = ref('')
let columns = []
const showData = ref(false)
const showDetail = ref(false)
let dataRows = []
const errorMessage = ref('')
const sectionName = ref(null)
const myChildRoute = ref('--')
const route = useRoute()
const routeName = ref(route.name)
const itemId = ref(0)
const filter = ref(null)

const props = defineProps({
  clientSectionName: {
    type: String,
    default: 'person'
  }
})

onMounted(() => {
  console.log('onMounted', filter.value, props.clientSectionName, route.name)
  changeSection(props.clientSectionName)
})

watch(
  () => route.name,
  () => (routeName.value = route.name)
)
// watch(
//   () => props.clientSectionName,
//   () => changeSection(props.clientSectionName)
// );

const changeSection = (newSectionName) => {
  sectionName.value = newSectionName
  const metaData = ccd.getClientComponentData(myClientStore.SectionName)
  filter.value = myClientStore.SectionFilter
  // sectionName.value = myClientStore.SectionName;
  postUrl.value = ccd.getPostUrl(myClientStore.SectionName)
  title.value = ccd.getTitle(myClientStore.SectionName)
  columns = ccd.getTableColumns(myClientStore.SectionName)
  myChildRoute.value = ccd.getChildRoute(myClientStore.SectionName)
  dataRows = myClientStore.CurrentSection
  showData.value = true // Array.isArray(dataRows.value) ? true : false;
  showDetail.value = false
  console.log(
    'ClientDataList - changeSecton: ',
    newSectionName,
    sectionName.value,
    myClientStore.SectionName
  )
  // getData(props.sectionName, metaData["getUrl"]);
}

const editItem = (item) => {
  showData.value = false
  itemId.value = item.id
  myClientStore.setItemById(item.id)
  const childRoute = ccd.getRouteName(myClientStore.SectionName)
  myChildRoute.value = childRoute
  showDetail.value = true
  showData.value = false
  emit('editItem', item.id)
}

const rowClick = (evnt, item) => {
  editItem(item)
}

const addItem = () => {
  // console.log("ClientDataList - add Item");
  emit('addItem')
}

const deleteItem = async (item) => {
  const resp = await clientService.deleteItem(myClientStore.SectionName, item.id)
  errorMessage.value = JSON.stringify(resp)
  const idx = dataRows.findIndex((rowitem) => rowitem.id == item.id)
  if (-1 < idx) {
    const delitem = dataRows.splice(idx, 1)
  }
  // emit("deleteItem", item.id);
}
const viewList = () => {
  showDetail.value = false
  showData.value = true
}

const filterChange = (rows, terms) => {
  // myClientStore.setSectionFilter(terms);
  console.log(myClientStore.SectionName + ':' + myClientStore.SectionFilter)
  return rows.filter((row) => {
    const bFound = Object.entries(row).find(([k, v]) => String(v).indexOf(terms) > -1)
    return bFound
  })
}
// onMounted(() => {
//   changeSection(props.sectionName);
// });
</script>
<style>
.short {
  height: 128px;
  background-color: azure;
}

.long {
  height: 358px;
  background-color: lightgray;
}
.thinToolBar {
  height: 20px;
  font-size: small;
}
.v-layout-header {
  height: 1px;
}
.v-toolbar-thin {
  height: 24px;
  font-size: small;
  padding-bottom: 1px;
  padding-top: 1px;
  margin-bottom: 1px;
  margin-top: 1px;
}
.v-toolbar-title {
  font-weight: bolder;
  inline-size: auto;
}

tr.headerrow {
  background-color: purple;
  color: #333;
  font-weight: bold;
}

th.hdr {
  font-weight: bold;
}

th.id-column {
  color: black;
  background-color: rgba(211, 211, 211, 0.849);
  width: '38px';
  border-bottom: solid, 3px, black;
}

td.id-column {
  color: black;
  background-color: lightgray;
  width: '38px';
  font-weight: bold;
  text-align: right;
}
</style>
