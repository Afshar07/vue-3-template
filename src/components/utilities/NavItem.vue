<template>
  <router-link v-if="props.item.hasAccess" class="mt-1 text-black dark:text-white fill-black dark:fill-white"
               :to="props.item.link" exact-active-class="link-active-class">
    <div
        v-show="!props.item?.hasChildren"
        class="flex items-center gap-1 hover:fill-white rounded-xl px-3.5 py-3 cursor-pointer hover:bg-primary hover:text-white text-md font-medium">
      <component class="w-5 h-5" :is="icons[props.item.icon]"></component>
      <span class="mt-1">
            {{ props.item.title }}
      </span>
    </div>
  </router-link>
</template>

<script setup>
import KeyIcon from "@/components/icons/KeyIcon.vue";
// import CircleIcon from "@/components/icons/CircleIcon.vue";
import UserIcon from "@/components/icons/UserIcon.vue";
import TasksIcon from "@/components/icons/TasksIcon.vue";
import DashboardIcon from "@/components/icons/DashboardIcon.vue";

import CircleIcon from "@/components/icons/CircleIcon.vue";

const props = defineProps({
  item: Object
})
const icons = {
  KeyIcon,
  UserIcon,
  TasksIcon,
  DashboardIcon
}


</script>

<style scoped>

</style>