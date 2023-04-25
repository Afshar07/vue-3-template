<template>
  <div>
    <button @click="showToast" type="button" class="btn bg-primary my-3 text-white">Submit</button>
  </div>
</template>

<script setup>
import {useToastStore} from "@/stores/toast";
import {inject} from "vue";
const toast = inject('toast')
const toastStore = useToastStore();

function showToast(){
  toast.error({content:'hello world'})

}
</script>

<style scoped>

</style>
