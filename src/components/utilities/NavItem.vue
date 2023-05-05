<template>
  <router-link v-if="props.item.hasAccess" class="mt-1 text-black dark:text-white fill-black dark:fill-white"
               :to="props.item.link" exact-active-class="link-active-class">
    <div
        v-show="!props.item?.hasChildren"
        class="flex items-center gap-1 hover:fill-white hover:!rounded-xl !rounded-xl px-3.5 py-3 cursor-pointer hover:bg-primary hover:text-white text-md font-medium">
      <component class="w-5 h-5" :is="icons[props.item.icon]"></component>
      <span class="mt-1">
            {{ props.item.title }}
      </span>
    </div>
  </router-link>
</template>

<script setup>
import UserIcon from "@/components/icons/UserIcon.vue";
import DashboardIcon from "@/components/icons/DashboardIcon.vue";
import ServicesIcon from "@/components/icons/ServicesIcon.vue";
import ReportsIcon from "@/components/icons/ReportsIcon.vue";
import ChatIcon from "@/components/icons/ChatIcon.vue";
import VIPIcon from "@/components/icons/VIPIcon.vue";
const props = defineProps({
  item: Object
})
const icons = {
  UserIcon,
  DashboardIcon,
  ServicesIcon,
  ReportsIcon,
  ChatIcon,
  VIPIcon
}


</script>

<style scoped>

</style>
