<template>
  <div class="min-h-screen relative items-between w-full flex flex-col md:flex-row  bg-gray-100 dark:bg-dark">
    <Overlay></Overlay>
    <Toast></Toast>
    <!--  sidebar  -->
    <div v-if="!fullLayout"
         :class="{  ' md:!block md:!relative   hidden ': !sideBarStore.showSideBar, '!w-[16rem]' : route.name ==='conversation'}"
         class="w-[17rem] 2md:hidden min-h-screen max-h-full fixed top-0 left-0 z-10 "
    >

      <!--      lg:col-span-3 2xl:col-span-2 col-span-12-->
      <side-bar></side-bar>
    </div>
    <!--  main content  -->

    <div
        :class="[fullLayout ? '' : 'p-2', route.name==='conversation' ? '!p-0' : '']"
        class=" lg:w-[calc(100vw-16rem)] md:w-[calc(100vw-14rem)] w-full  md:ml-3 z-50 min-h-screen md:mb-0 mb-10  h-full"
    >
      <!--      lg:col-span-9 col-span-12 2xl:col-span-10-->
      <Header v-if="!fullLayout"></Header>
      <router-view v-slot="{ Component }">
        <transition name="fade" appear mode="out-in">
          <component :is="Component"/>
        </transition>
      </router-view>
    </div>


    <!--  bottom nav  -->
    <div
        v-if="showBottomNav"
        class="col-span-12 md:hidden block sticky mt-2 bottom-3 left-0 z-50 flex items-end h-1"
    >
      <BottomNav></BottomNav>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, inject, onMounted, watch} from "vue";
import {RouterView, useRoute, useRouter} from "vue-router";
import Header from "@/components/main/Header.vue";
import Toast from "@/components/utilities/Toast.vue";
import Overlay from "@/components/utilities/Overlay.vue";
import SideBar from "@/components/main/sideBar.vue";
import {useAppStore} from "@/stores/app";
import {useSideBarStore} from "@/stores/sideBar";
import BottomNav from "@/components/main/BottomNav.vue";
import {VueCookies} from "vue-cookies";
import {useAuthStore} from "@/stores/auth";

const appStore = useAppStore();
const sideBarStore = useSideBarStore();
const route: any = useRoute();
const router: any = useRouter();
const $cookies: any = inject<VueCookies>('$cookies')
const authStore: any = useAuthStore()
let fullLayout = computed(() => {
  return (
      (route.name !== undefined && route.name === "index")
  );
});
let showBottomNav = computed(() => {
  return (
      route.name !== undefined &&
      route.name !== "index"
  );
});
onMounted(async () => {

  const body: any = document.querySelector("body");
  // Set theme
  if (appStore.getSiteTheme) {
    body.classList.add("dark");
  } else {
    body.classList.remove("dark");
  }

  // Set RTL
  const isRTL = appStore.isRTL;
  if (isRTL) body.style.direction = "rtl";
});
</script>

<style scoped></style>
