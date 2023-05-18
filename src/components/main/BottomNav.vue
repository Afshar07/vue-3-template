<template>
  <div
    class="w-full flex rounded-b-lg relative items-center justify-around dark:text-white h-16 bg-white dark:bg-dark-muted shadow-xl border-t border-t-gray-200 dark:border-t-gray-800"
  >
    <transition name="slide-up" appear>
      <div
        class="absolute bottom-full w-full"
        @click="closeBottomModal"
        v-if="isRenderingBottomModal"
      >
        <div
          class="fixed top-0 right-0 w-full h-full bg-gray-500/70 opacity-50"
          @click="closeBottomModal"
        ></div>
        <div
          @click.prevent
          class="w-full z-50 relative p-5 rounded-t-xl bg-slate-50"
        >
          <div
            class="flex border-dotted border-b w-full pb-3 items-center gap-2"
          >
            <DynamicIcon
              :key="tmpSubItems.icon"
              :icon="tmpSubItems.icon"
            ></DynamicIcon>
            <strong class="text-gray-900">{{ tmpSubItems.title }}</strong>
          </div>
          <div class="w-full flex flex-col items-start">
            <router-link
              v-for="(item, idx) in tmpSubItems.children"
              :key="idx"
              :to="item['link']"
              class="flex items-center text-gray-500 fill-gray-500 p-3 gap-2"
            >
              <CircleIcon class="w-4 h-4"></CircleIcon>
              <small class="mt-0.5">{{ item["title"] }}</small>
            </router-link>
          </div>
        </div>
      </div>
    </transition>

    <template v-for="(item, idx) in navigationItems">
      <div
        v-if="hasAccess(item.hasAccess)"
        class="z-50 relative"
        :class="{ 'bottom-active-class': route.path === item.link }"
      >
        <div
          @click="openBottomModal(item)"
          class="flex flex-col items-center justify-center !text-gray-400 fill-gray-400"
        >
          <DynamicIcon class="dark:fill-white" :icon="item.icon"></DynamicIcon>
          <small>{{ item["title"] }}</small>
        </div>
      </div>
      <!--      <router-link v-if="hasAccess(item.hasAccess)" active-class="bottom-link-active-class"-->
      <!--                   exact-active-class="bottom-link-active-class" :to="item['link']">-->
      <!--        <div class=" p-2  flex flex-col items-center justify-center">-->
      <!--          <DynamicIcon :icon="item.icon"></DynamicIcon>-->
      <!--          <small>{{ item['title'] }}</small>-->
      <!--        </div>-->
      <!--      </router-link>-->
    </template>
  </div>
</template>

<script setup>
import { sideBarItems } from "@/models/sideBarItems";
import { useAuthStore } from "@/stores/auth";
import DynamicIcon from "@/components/main/DynamicIcon.vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import CircleIcon from "@/components/icons/CircleIcon.vue";

const router = useRouter();
const route = useRoute();
const navigationItems = sideBarItems;
let tmpSubItems = ref(null);
const authStore = useAuthStore();
let isRenderingBottomModal = ref(false);
const openBottomModal = function (item) {
  if (item.hasChildren) {
    tmpSubItems.value = null;
    isRenderingBottomModal.value = true;
    tmpSubItems.value = item;
  } else {
    router.push(item.link);
  }
};
const closeBottomModal = () => {
  isRenderingBottomModal.value = false;
};
const hasAccess = function (accessRoles) {
  if (
    accessRoles.includes("All") ||
    accessRoles.includes(authStore?.getUser?.role?.toLowerCase())
  ) {
    return true;
  }
  return false;
};
</script>

<style scoped>
.bottom-active-class {
  @apply [&>*]:text-primary [&>*]:fill-primary !important;
}
</style>
