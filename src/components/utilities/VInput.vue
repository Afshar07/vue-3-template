
<template>
  <div class="relative rounded-lg border border-white hover:border hover:border-primary bg-white">
    <div @click="modelValue=null" v-if="modelValue" class="absolute top-2 left-2">
      <CloseIcon class="fill-gray-400"></CloseIcon>
    </div>
    <div class="rounded-lg border rounded border-gray-300" :class="{'!border-red-500':error,'!border-achareh-green':error === false}">
      <input
          :class="{'!border-primary':isRequired}"
          class="w-full rounded-lg text-right border dark:text-gray-900 bg-gray-50 leading-10 ring-0 text-[14px] pr-2 placeholder:text-[14px] outline-0 px-2"
          :placeholder="placeHolder"
          :type="dataType"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          :maxlength="maxLength"
      />
    </div>
  </div>
    <span v-if="error" class="text-red-500  text-[10px]">{{ errorMessage }}</span>
</template>


<script setup>

import CloseIcon from "../icons/CloseIcon.vue";

defineProps(['modelValue','dataType','maxLength','error','errorMessage','placeHolder','isRequired'])
defineEmits(['update:modelValue'])

</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type=number]{
  -moz-appearance: textfield;
}
</style>
