<template>
  <div
      class="w-full flex items-center justify-around dark:text-white   h-16 bg-white dark:bg-dark-muted shadow-xl border-t border-t-gray-200 dark:border-t-gray-800  ">

    <router-link active-class="bottom-link-active-class" exact-active-class="bottom-link-active-class"   :to="item['link']" v-for="(item,idx) in navigationItems" class="dropdown  dropdown-top">
      <div class=" p-2  flex flex-col items-center justify-center">
        <component class="w-5 h-5 dark:fill-white " :is="icons[item.icon]"></component>
        <small>{{ item['title'] }}</small>
      </div>
    </router-link>



  </div>
</template>

<script setup lang="ts">
import {sideBarItems} from "@/models/sideBarItems";
import UserIcon from "@/components/icons/UserIcon.vue";
import LayoutIcon from "@/components/icons/LayoutIcon.vue";
import BankCardIcon from "@/components/icons/BankCardIcon.vue";
import BankAccountIcon from "@/components/icons/BankAccountIcon.vue";
import DashboardIcon from "@/components/icons/DashboardIcon.vue";
import ServicesIcon from "@/components/icons/ServicesIcon.vue";
import ReportsIcon from "@/components/icons/ReportsIcon.vue";
import ChatIcon from "@/components/icons/ChatIcon.vue";
import VIPIcon from "@/components/icons/VIPIcon.vue";
const navigationItems = sideBarItems;
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
