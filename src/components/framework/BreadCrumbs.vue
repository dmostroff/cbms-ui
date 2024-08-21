<template>
  <v-toolbar inset>
    <v-breadcrumbs
      active-color="blue"
      style="font-size: 16px"
      :items="breadcrumb_items"
      @click="breadcrumbClick(item)"
    >
      <!-- <v-breadcrumbs-el v-if="props.level > 0" label="Home" icon="home" @click="goHome" />
      <q-breadcrumbs-el
        class="mx-sm"
        label="Clients"
        icon="people"
        v-if="props.level > 1 && props.level < 10"
        @click="goToClients"
      />
      <v-breadcrumbs-el
        v-if="props.level > 10 && props.level < 20"
        label="Cards"
        @click="goToCards"
      />
      <q-breadcrumbs-el
        v-if="props.level > 2 && props.level < 10"
        :label="myClientStore.SectionTitle"
        icon="topic"
        ><q-icon name="arrow_drop_down"></q-icon>
        <q-menu auto-close>
          <q-list hightlight separator class="text-blue-5 text-caption">
            <q-item
              hightlight
              separator
              :class="item.value == myClientStore.SectionName ? 'bg-grey-3' : 'bg-white'"
              v-for="(item, idx) in ccd.clientLeftNavItems"
              :key="idx"
            >
              <div @click="sectionClick(item.value)">
                {{ item.label }}
              </div>
            </q-item>
          </q-list>
        </q-menu>
      </q-breadcrumbs-el>
      <q-breadcrumbs-el
        v-if="props.level > 3 && props.level < 10"
        label="ShowList"
        @click="showList"
      /> -->
    </v-breadcrumbs>
  </v-toolbar>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { VBreadcrumbsItem } from 'vuetify/components'
import clientStore from '@/stores/ClientStore'
import ccd from '@/stores/ClientComponentData'
import type vuetify from '@/plugins/vuetify'

const props = defineProps({
  level: {
    type: Number,
    default: 1
  }
})
const router = useRouter()
const myClientStore = clientStore()
const breadcrumb_items = reactive([
  {
    title: 'Home',
    disabled: false,
    href: 'home'
  },
  {
    title: 'Clients',
    disabled: false,
    href: 'clients'
  },
  {
    title: 'Cards',
    disabled: false,
    href: 'cards'
  }
])

const clientLeftNavItems = ccd.clientLeftNavItems

const emits = defineEmits(['sectionClick', 'showClientDataList'])

const breadcrumbClick = (item: VBreadcrumbsItem) => {
  if (item.href === undefined) {
    router.push(item.tag)
  }
}
const goTo = (routeName: string) => {
  router.push({ name: routeName })
}

const sectionClick = (aSectionName: string) => {
  emits('sectionClick', aSectionName)
}

const showList = () => {
  emits('showClientDataList')
}
</script>

<style></style>
