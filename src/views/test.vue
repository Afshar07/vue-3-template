<template>
  <div class="main-card">
<Chat></Chat>
  </div>
</template>

<script setup>
import Chat from '@/components/main/Chat.vue'
import {useToastStore} from "@/stores/toast";
import {inject} from "vue";
const toast = inject('toast');
const toastStore = useToastStore();

function showToast(){
  toast.success({content:'hello world'});
}
</script>

<style scoped>

</style>
