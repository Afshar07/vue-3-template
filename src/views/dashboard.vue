<template>
  <div class="min-h-full w-full grid grid-cols-12">
    <div class="col-span-12 z-[12] drawer-content">
      <div class="bg-white dark:bg-dark-muted flex justify-center items-center rounded-xl shadow col-span-12 h-[40rem] gap-3 p-5 ">
<!--        <Chart></Chart>-->
        <img src="../../public/favicon.png" class="w-[30rem] h-[30rem]" alt="">
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
