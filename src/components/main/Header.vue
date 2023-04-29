<template>
  <div
      class="bg-white mb-3 sticky dark:bg-dark-muted rounded-xl flex items-center justify-between w-full shadow gap-3 p-5">
    <div @click="openSideBar" class="md:hidden block hover:fill-primary">
      <MenuIcon class="fill-black dark:fill-white "></MenuIcon>
    </div>
    <div class="flex cursor-pointer items-center">
      <div class="relative flex ">
        <small class="opacity-0">asd</small>

        <transition name="rotate">
          <!-- moon icon -->
          <MoonIcon v-if="appStore.getSiteTheme"
                    :class="{'!block ': appStore.getSiteTheme,'absolute':appStore.getSiteTheme}"
                    @click="toggleSiteTheme" class="fill-black  left-0   dark:fill-white "></MoonIcon>
        </transition>
        <transition name="rotate">
          <!-- sun icon -->
          <SunIcon v-if="!appStore.getSiteTheme"
                   :class="{'!block ':!appStore.getSiteTheme,'absolute':!appStore.getSiteTheme}"
                   @click="toggleSiteTheme" class="fill-black  left-0   dark:fill-white "></SunIcon>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useAppStore} from "@/stores/app";
import MenuIcon from "@/components/icons/MenuIcon.vue";
import {useSideBarStore} from "@/stores/sideBar";
import MoonIcon from "@/components/icons/MoonIcon.vue";
import SunIcon from "@/components/icons/SunIcon.vue";
import {ref, watch} from "vue";

const sideBar = useSideBarStore()
const appStore = useAppStore()

function toggleSiteTheme() {
  appStore.toggleSiteTheme()
}

function openSideBar() {
  sideBar.showSideBar = !sideBar.showSideBar
}
</script>

<style scoped>

</style>
