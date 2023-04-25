<template>
  <div>
    <button @click="showToast" type="button" class="btn bg-primary my-3 text-white">rgtrgfm</button>
  </div>
</template>

<script setup>
import {useToastStore} from "@/stores/toast";

const toastStore = useToastStore();

function showToast(){
  toastStore.showToast = true
  toastStore.toastData = {
    content: 'Information Has Been Updated',
    variant: 'success',
  }
}
</script>

<style scoped>

</style>