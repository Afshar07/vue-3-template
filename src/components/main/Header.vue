<template>
  <div
      class="bg-white mb-3 sticky top-0 z-50 dark:bg-dark-muted rounded-xl flex items-center justify-between w-full shadow gap-3 p-5">
    <div @click="openSideBar" class="hidden block hover:fill-primary">
      <MenuIcon class="fill-black dark:fill-white "></MenuIcon>
    </div>
    <div class="flex items-center z-50 relative justify-center">
      <div @click="logout" class=" text-black md:hidden dark:text-white fill-black dark:fill-white">
        <div class=" flex btn bg-red-500 border-none btn-sm items-center gap-2 hover:fill-white rounded-xl px-3.5  cursor-pointer hover:bg-primary hover:text-white text-md font-medium">
          <PowerIcon class=" w-5 h-5 fill-white"></PowerIcon>
          <span class="">
            خروج
            </span>
        </div>
      </div>
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
import {useAuthStore} from "@/stores/auth";
import router from "@/router";
import DoorIcon from "@/components/icons/DoorIcon.vue";
import PowerIcon from "@/components/icons/PowerIcon.vue";

const sideBar = useSideBarStore()
const appStore = useAppStore()
const authStore = useAuthStore()

function toggleSiteTheme() {
  appStore.toggleSiteTheme()
}
function logout() {
  authStore.logout()
  router.push('/')
}

function openSideBar() {
  sideBar.showSideBar = !sideBar.showSideBar
}
</script>

<style scoped>

</style>
