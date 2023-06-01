<template>
  <div class="flex flex-col justify-center items-center col-span-12 h-[45rem] gap-3 p-5">
    <!--        <Chart></Chart>-->
    <h1 class="text-[1.5rem] md:text-[3rem] text-gray-700 dark:text-white">به {{ appName }} خوش آمدید</h1>
    <img src="../../public/logo.jpg" class="w-[15rem] h-[15rem] rounded-xl" alt="">
  </div>
</template>

<script setup lang="ts">
import {inject} from "vue";

const helper: any = inject('helper')
const appName:string = helper.appName

</script>

<style scoped>

</style>
