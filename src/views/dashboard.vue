<template>
  <div class=" min-h-full w-full grid grid-cols-12">
    <div class="md:col-span-2 col-span-12">
      <side-bar></side-bar>
    </div>
    <div class="md:col-span-10 p-5 col-span-12 z-[12] drawer-content">
      <Header></Header>
      <div class="bg-white dark:bg-dark-muted rounded-xl shadow col-span-12 h-[40rem] gap-3 p-5 ">
        <Chart></Chart>
      </div>
    </div>
  </div>
</template>

<script setup>
import Chart from "@/components/main/Chart.vue";

import SideBar from "../components/main/sideBar.vue";
import {useToastStore} from "../stores/toast";
import Header from "../components/main/Header.vue";

</script>

<style scoped>

</style>
