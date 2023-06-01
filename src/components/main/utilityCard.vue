<template>
  <label :for="props.data['openModal']" @click="emitUtilityData"  class=" md:col-span-3 col-span-6  h-28    flex flex-col  justify-between    ">
    <div class="h-2/3 flex items-center justify-center rounded-t shadow bg-white dark:bg-dark-muted">
      <DynamicIcon :icon="props.data['icon']" class="w-8 h-8 dark:fill-white"></DynamicIcon>
    </div>

    <div
       :class="props.data['bgColor']"
        class="w-full text-center  flex  rounded-b shadow text-white items-center justify-center h-1/3">
      <small>{{ props.data['title']  }}</small>
    </div>
  </label>
</template>

<script setup>
import DynamicIcon from "@/components/main/DynamicIcon.vue";
const props = defineProps({
  data:{
    type:Object
  },
})
const emits = defineEmits(['setUtilityData'])

function emitUtilityData(){
emits('setUtilityData',props.data)
}
</script>

<style scoped>

</style>