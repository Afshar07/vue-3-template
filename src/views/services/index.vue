<template>
  <div class="md:main-card  grid gap-2 grid-cols-12">
    <router-link to="/services/statement"  class=" md:col-span-3 col-span-4  h-28    flex flex-col  justify-between    ">
      <div class="h-2/3 flex items-center justify-center rounded-t shadow bg-white dark:bg-dark-muted">
        <PaperIcon class="w-8 h-8 dark:fill-white"></PaperIcon>
      </div>
      <div
          class="w-full  flex bg-[#ec4899]   rounded-b shadow text-white items-center justify-center h-1/3">
        <small>اظهار نامه</small>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import {inject} from "vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import PaperIcon from "@/components/icons/PaperIcon.vue";
const helper:any = inject('helper')

</script>

<style scoped>

</style>