<template>
  <Dropdown v-if="props.item.hasChildren && props.item.hasAccess">
    <template v-slot:title>
      <div
          class="flex items-center gap-2">
        <component class="w-5 h-5" :is="icons[props.item.icon]"></component>
        <!--            <KeyIcon></KeyIcon>-->
        <span class="mt-1 ">
            {{ props.item.title }}
            </span>
      </div>
    </template>

    <template v-slot:content>
      <div v-if="props.item?.children.length>0" class="  p-0 dark:bg-dark-muted">
        <li v-for="(el,idx) in props.item.children">
          <router-link :to="el.link" v-if="el.hasAccess" class="my-0.5 hover:!fill-white fill-gray-400" exact-active-class="link-active-class">
            <div class="flex items-center gap-2">
              <CircleIcon class=" w-3 h-3"></CircleIcon>
              <span class="mt-1 text-black dark:text-white">
              {{ el.title }}
              </span>
            </div>
          </router-link>
        </li>
      </div>
    </template>
  </Dropdown>
<!--  <div :tabindex="0" v-show="props.item?.hasChildren"-->
<!--       class="collapse my-1 focus:bg-primary text-black dark:text-white fill-black dark:fill-white  cursor-pointer collapse-arrow   transition-all rounded-box">-->

<!--    <div-->
<!--        class="collapse-title  flex items-center gap-2 hover:fill-white  hover:!bg-primary hover:text-white text-md font-medium">-->
<!--      <component class="w-5 h-5" :is="icons[props.item.icon]"></component>-->
<!--      &lt;!&ndash;            <KeyIcon></KeyIcon>&ndash;&gt;-->
<!--      <span class="mt-1 ">-->
<!--            {{ props.item.title }}-->
<!--            </span>-->
<!--    </div>-->
<!--    <div v-if="props.item?.children.length>0" class="collapse-content  p-0 dark:bg-dark-muted">-->
<!--      <li v-for="(el,idx) in props.item.children">-->
<!--        <router-link :to="el.link" class="my-0.5 hover:!fill-white fill-gray-400" exact-active-class="link-active-class">-->
<!--          <div class="flex items-center gap-2">-->
<!--            <CircleIcon class=" w-3 h-3"></CircleIcon>-->
<!--            <span class="mt-1">-->
<!--              {{ el.title }}-->
<!--              </span>-->
<!--          </div>-->
<!--        </router-link>-->
<!--      </li>-->
<!--    </div>-->
<!--  </div>-->


</template>

<script setup>
import KeyIcon from "@/components/icons/KeyIcon.vue";
import DashboardIcon from "@/components/icons/DashboardIcon.vue";import
  UserIcon from "@/components/icons/UserIcon.vue";
import TasksIcon from "@/components/icons/TasksIcon.vue";
import CircleIcon from "@/components/icons/CircleIcon.vue";
import OrderIcon from "../icons/OrderIcon.vue"
import UsersIcon from "@/components/icons/UsersIcon.vue";
import Dropdown from "@/components/utilities/DropDown.vue";

const props = defineProps({
  item: Object
})
const icons = {
  KeyIcon,
  UserIcon,
  TasksIcon,
  OrderIcon,
  DashboardIcon,
  UsersIcon
}

</script>

<style scoped>

</style>
