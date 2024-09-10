<template>
    <menu-display :menuItems="menuItems"></menu-display>
</template>
<script setup lang="ts">
import MenuDisplay from '@/components/common/MenuDisplay';

interface prompt {
  prompt: string
  link: object
}
const name: string = "AdminHomeLeftNav"
const menuItems: Array<prompt> = [
        {
          prompt: "Users",
          link: { name: "authUsers" },
        },
        {
          prompt: "Settings",
          link: { name: "AdmSettingHome" },
        },
        {
          prompt: "CC Companies",
          link: { name: "ccCompanies" },
        },
        {
          prompt: "CC Cards",
          link: { name: "ccCards" },
        },
      ]
</script>