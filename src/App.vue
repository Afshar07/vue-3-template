<template>
  <div class="min-h-screen w-full grid grid-cols-12 bg-gray-100 dark:bg-dark">
    <Overlay></Overlay>
    <Toast></Toast>
    <div v-if="!fullLayout" class="md:col-span-2 col-span-12">
      <side-bar></side-bar>
    </div>
    <div :class="[fullLayout ? '' : 'p-5']" class="md:col-span-10 col-span-12 z-[1]">
      <Header v-if="!fullLayout"></Header>
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, watch} from "vue";
import {RouterView, useRoute} from 'vue-router'
import Header from "@/components/main/Header.vue";
import Toast from "@/components/utilities/Toast.vue";
import Overlay from "@/components/utilities/Overlay.vue";
import SideBar from "@/components/main/sideBar.vue";
import {useAppStore} from "@/stores/app";
const appStore = useAppStore()
const route: any = useRoute();
let fullLayout = computed(() => {
  return route.name !== undefined
      && route.name === 'index'
})
onMounted(() => {
  const body: any = document.querySelector('body')
  if (appStore.getSiteTheme) {
    body.classList.add('dark')
  } else {
    body.classList.remove('dark')
  }
})

</script>


<style scoped>


</style>
