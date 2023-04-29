<template>
  <div class="main-card grid-cols-12">
    <div class="col-span-12 z-[12] drawer-content">
      <div class="flex flex-col justify-center items-center col-span-12 h-[45rem] gap-3 p-5">
<!--        <Chart></Chart>-->
        <h1 class="text-[1.5rem] md:text-[3rem] text-gray-700 dark:text-white">Welcome to {{ appName }}</h1>
        <img src="../../public/logo.png" class="w-[15rem] h-[15rem] rounded-xl" alt="">
      </div>
    </div>
  </div>
</template>

<script setup>
import Chart from "@/components/main/Chart.vue";
import {inject} from "vue";
const helper = inject('helper');
const appName = helper.appName;
</script>

<style scoped>

</style>
