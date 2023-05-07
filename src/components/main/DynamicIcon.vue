<template>
  <component class="w-6 h-6" :is="dynamicIconComponent"></component>
</template>

<script setup>
import {defineAsyncComponent, watch} from "vue";

const props = defineProps({
  icon: {
    type: String,
    required: false,
  },
});
// importing icons dynamically from sidebarItems by icon property
let dynamicIconComponent = defineAsyncComponent({
  loader: () => import(`../icons/${props.icon}.vue`),
});

</script>

<style scoped></style>
