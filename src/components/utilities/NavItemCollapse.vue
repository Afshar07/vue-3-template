<template>
  <Dropdown v-if="props.item.hasChildren && hasAccess(props.item.hasAccess)">
    <template v-slot:title>
      <div
          class="flex items-center gap-2">
        <DynamicIcon :icon="props.item.icon"></DynamicIcon>
        <span class="mt-1 text-black dark:text-white">
            {{ props.item.title }}
        </span>
      </div>
    </template>
    <template v-slot:content>
      <div v-if="props.item?.children.length>0" class="p-0 dark:bg-dark-muted">
        <li v-for="(el,idx) in props.item.children">
          <router-link :to="el.link" v-if="el.hasAccess" class="my-0.5 hover:!fill-white fill-gray-400"
                       exact-active-class="link-active-class">
            <div class="flex items-center gap-2">
              <CircleIcon class="w-3 h-3"></CircleIcon>
              <span class="mt-1 text-gray-700 dark:text-gray-300">
              {{ el.title }}
              </span>
            </div>
          </router-link>
        </li>
      </div>
    </template>
  </Dropdown>

</template>

<script setup>
import CircleIcon from "@/components/icons/CircleIcon.vue";
import Dropdown from "@/components/utilities/DropDown.vue";
import {useAuthStore} from "@/stores/auth";
import DynamicIcon from "@/components/main/DynamicIcon.vue";

const authStore = useAuthStore()
const props = defineProps({
  item: Object
})
const hasAccess = function (accessRoles) {
  if (accessRoles.includes('All') || accessRoles.includes(authStore.getUser.role.toLowerCase())) {
    return true;
  }
  return false;
};


</script>

<style scoped>

</style>
