<template>
  <router-link v-if="hasAccess(props.item.hasAccess)" class="mt-1 text-black dark:text-white fill-black dark:fill-white"
               :to="props.item.link" exact-active-class="link-active-class">
    <div
        v-show="!props.item?.hasChildren"
        class=" transform transition-all hover:scale-105 flex items-center gap-1 hover:fill-white hover:!rounded-xl !rounded-xl px-3.5 py-3 cursor-pointer hover:bg-primary hover:text-white text-md font-medium">
      <DynamicIcon :icon="props.item.icon"></DynamicIcon>
      <span class="mt-1 ">
            {{ props.item.title }}
      </span>
    </div>
  </router-link>
</template>

<script setup>

import {onBeforeMount} from "vue";
import {useAuthStore} from "@/stores/auth";
import DynamicIcon from "@/components/main/DynamicIcon.vue";

const authStore = useAuthStore()
const props = defineProps({
  item: Object
})
const hasAccess = function (accessRoles) {
  if (accessRoles.includes('All') || accessRoles.includes(authStore?.getUser?.role?.toLowerCase())) {
    return true;
  }
  return false;
};


</script>

<style scoped>

</style>
