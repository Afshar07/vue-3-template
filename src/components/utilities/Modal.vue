<template>
  <!--  Modal region  -->
  <input type="checkbox" :id="props.id" ref="closeModalRef" class="modal-toggle"/>
  <div class="modal md:modal-middle  items-start">
    <label for="" style="direction: ltr!important;" class="modal-box m-2 p-0 bg-white dark:bg-dark-muted">
      <div v-if="props.title"
           class=" flex items-center justify-center pb-2  my-3 border-b dark:border-gray-400 border-gray-200">
        <strong class="dark:text-white text-black  text-lg">{{ props.title }}</strong>
      </div>
      <slot v-if="hasBody" name="modalBody"></slot>
      <div :class="{'border-t pt-3' : hasBody}"
           class="dark:border-gray-400 border-gray-200  mt-3 space-x-3 !justify-start px-3 pb-3">
        <label v-if="props.okModalTitle" @click="ok" for="optionsModal" class="btn bg-violet border-none text-white">
          <span class="mt-1">
          {{ props.okModalTitle }}
          </span>
        </label>
        <label @click="closeModal" :for="props.id" class="btn dark:bg-gray-400 bg-gray-500 border-none text-white">
          <span class="mt-1">
          {{ props.closeModalTitle }}
          </span>
        </label>
      </div>
    </label>

  </div>
  <!--  Modal region End -->
</template>

<script setup lang="ts">
import {reactive, ref} from "vue";

const props = defineProps({
  id: {
    type: String,
  },
  title: {
    type: String
  },
  closeModalTitle: {
    type: String,
    required: false,
    default: 'close'
  },
  okModalTitle: {
    type: String
  },
  hasBody: {
    type: Boolean,
    default: true
  }
})
const emits = defineEmits(['closeModal', 'ok'])

const closeModalRef: any = ref(null)

function ok(): void {
  emits('ok')
}

function closeModal(): void {
  emits('closeModal')
  closeModalRef.click()
}

</script>

<style scoped>

</style>
