<template>
  <div
      class="w-full flex items-center justify-around dark:text-white   h-16 bg-white dark:bg-dark-muted shadow-xl border-t border-t-gray-200 dark:border-t-gray-800  ">
    <template v-for="(item,idx) in navigationItems">
      <router-link v-if="hasAccess(item.hasAccess)" active-class="bottom-link-active-class"
                   exact-active-class="bottom-link-active-class" :to="item['link']" class="dropdown  dropdown-top">

        <div class=" p-2  flex flex-col items-center justify-center">
          <DynamicIcon :icon="item.icon"></DynamicIcon>
          <small>{{ item['title'] }}</small>
        </div>
      </router-link>
    </template>


  </div>
</template>

<script setup>
import {sideBarItems} from "@/models/sideBarItems";
import {useAuthStore} from "@/stores/auth";
import DynamicIcon from "@/components/main/DynamicIcon.vue";

const navigationItems = sideBarItems;
const authStore = useAuthStore()
const hasAccess = function (accessRoles) {
  if (accessRoles.includes('All') || accessRoles.includes(authStore?.getUser?.role?.toLowerCase())) {
    return true;
  }
  return false;
};


</script>

<style scoped>

</style>
