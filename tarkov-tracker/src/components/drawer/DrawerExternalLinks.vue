<template>
  <v-list nav bg-color="transparent" class="mx-auto">
    <drawer-item
      avatar="/img/tarkovdevlogo.png"
      locale-key="tarkovdev"
      href="https://tarkov.dev/"
      ext-link
    />
    <drawer-item
      avatar="/img/ratscannerlogo.png"
      locale-key="ratscanner"
      href="https://ratscanner.com/"
      ext-link
    />
    <drawer-item
      avatar="/img/tarkovgurulogo.png"
      locale-key="tarkovguru"
      href="https://tarkov.guru/"
      ext-link
    />
    <drawer-item
      avatar="/img/tarkovchangeslogo.svg"
      locale-key="tarkovchanges"
      href="https://tarkov-changes.com/"
      ext-link
    />
  </v-list>
</template>
<script setup>
import { defineAsyncComponent } from "vue";
const DrawerItem = defineAsyncComponent(() =>
  import("@/components/drawer/DrawerItem.vue")
);
</script>
<style lang="scss" scoped></style>

