<template>
  <div
    class="drawer fixed drawer-mobile z-0"
    :class="{
      '!z-[99] ': sideBarStore.showSideBar,
      '!z-[1]': !sideBarStore.showSideBar,
    }"
  >
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-side shadow-2xl w-full">
      <label
        ref="sideBarLabel"
        @click="countTouch"
        for="my-drawer-2"
        class="drawer-overlay fixed h-full"
      ></label>
      <ul
        class="menu h-full p-4 w-[16rem] bg-white dark:bg-dark-muted text-base-content"
      >
        <div class="flex items-center gap-1">
          <img src="/logo.jpg" class="w-8 h-8" alt="" />
          <h1 class="font-bold text-gray-800 dark:text-white text-2xl p-2">
            {{ appName }}
          </h1>
        </div>
        <!-- Sidebar content here -->
        <NavItem
          @click="setSelectedNavItem(item)"
          v-for="(item, idx) in navigationItems"
          :key="idx"
          :item="item"
        ></NavItem>
        <NavItemCollapse
          @click="setSelectedNavItem(item)"
          v-for="(item, idx) in navigationItems"
          :key="idx"
          :item="item"
        ></NavItemCollapse>
        <div
          @click="logout"
          class="my-1 text-black dark:text-white fill-black dark:fill-white"
        >
          <div
            class="flex items-center gap-2 hover:fill-white rounded-xl px-3.5 py-3 cursor-pointer hover:bg-primary hover:text-white text-md font-medium"
          >
            <DoorIcon></DoorIcon>
            <span class="mt-1"> خروج </span>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  onMounted,
  reactive,
  ref,
  watch,
  inject,
  onBeforeMount,
} from "vue";
const $cookies:any = inject<VueCookies>('$cookies')
import { useSideBarStore } from "@/stores/sideBar";
import NavItemCollapse from "@/components/utilities/NavItemCollapse.vue";
import NavItem from "@/components/utilities/NavItem.vue";
import DoorIcon from "@/components/icons/DoorIcon.vue";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import { sideBarItems } from "@/models/sideBarItems";
import {VueCookies} from "vue-cookies";

const router = useRouter();
const authStore: any = useAuthStore();
const sideBarStore = useSideBarStore();
const sideBarLabel: any = ref(null);
const selectedNavItem = ref(null);
let user = authStore.user;
let getSideBarStatus = computed(() => {
  return sideBarStore.showSideBar;
});

const helper: any = inject("helper");
const appName = helper.appName;

function isSelectedItem(item: any): Boolean {
  //@ts-ignore
  return selectedNavItem?.value?.title === item.title;
}

watch(getSideBarStatus, async (val) => {
  //@ts-ignore
  sideBarLabel.value.click();
});
let count = ref(0);
function countTouch() {
  if (count.value === 0) {
    count.value++;
  } else {
    sideBarStore.showSideBar = false;
    count.value = 0;
    sideBarLabel.value.click();
  }
}

function setSelectedNavItem(item: any) {

  if (item === selectedNavItem.value) {
    selectedNavItem.value = null;
  } else {
    selectedNavItem.value = item;
  }
}

// Setting Items of Sidebar
const navigationItems = sideBarItems;

function logout() {
  authStore.logout();
  router.push("/");
  $cookies.remove('token')
}
</script>

<style scoped></style>
