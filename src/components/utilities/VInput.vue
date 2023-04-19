
<template>
  <div class="relative rounded-xl border   border-white hover:border hover:border-primary bg-gray-50">
    <div @click="modelValue=null" v-if="modelValue" class="absolute top-1 right-2">
      <CloseIcon class="fill-gray-400"></CloseIcon>
    </div>
    <div class=" pl-1 rounded-xl   border rounded border-gray-300 " :class="{'!border-red-500':error,'!border-achareh-green':error === false}">
      <input

          class=" w-full  rounded-xl bg-gray-50  leading-8  text-[11px] pr-2   placeholder:text-[11px]  outline-0"
          :placeholder="placeHolder"
          :type="dataType"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          :maxlength="maxLength"
      />
    </div>
  </div>
    <span v-if="error" class="text-red-500 text-[10px]">{{ errorMessage }}</span>
</template>


<script setup>

import CloseIcon from "../icons/CloseIcon.vue";

defineProps(['modelValue','dataType','maxLength','error','errorMessage','placeHolder'])
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