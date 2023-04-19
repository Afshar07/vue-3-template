
<template>
<div class="min-h-screen bg-gray-100 dark:bg-dark">
  <Overlay></Overlay>
  <Toast></Toast>
<!--  <Header></Header>-->
  <RouterView />
</div>
</template>

<script setup lang="ts">
import {computed, onMounted, watch} from "vue";
import { RouterView } from 'vue-router'
import Header from "@/components/main/Header.vue";
import Toast from "@/components/utilities/Toast.vue";
import {useAppStore} from "@/stores/app";
import Overlay from "@/components/utilities/Overlay.vue";
const appStore = useAppStore()
const siteTheme = computed(()=>{
  return appStore.getSiteTheme
})

watch(siteTheme,async (val)=>{

  const body:any = document.querySelector('body')
  if(val==='dark'){
  body.classList.add(val)
  }else{
    body.classList.remove('dark')
  }
},{immediate:true})

</script>


<style scoped>


</style>
