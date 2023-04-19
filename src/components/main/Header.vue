<template>
  <div class="bg-white mb-3 sticky dark:bg-dark-muted rounded-xl flex items-center justify-between w-full shadow gap-3 p-3">
    <div @click="openSideBar" class="md:hidden block hover:fill-primary ">
      <MenuIcon class="fill-black dark:fill-white "></MenuIcon>
    </div>
    <div class="flex items-center">
      <label class="swap swap-rotate">
        <!-- this hidden checkbox controls the state -->
        <input v-model="themeToggler" type="checkbox"/>
        <!-- moon icon -->
        <MoonIcon class="fill-black dark:fill-white" ></MoonIcon>
        <!-- sun icon -->
        <SunIcon class="fill-black dark:fill-white"></SunIcon>
      </label>
    </div>
  </div>
</template>

<script setup>
import {useAppStore} from "@/stores/app";
import MenuIcon from "@/components/icons/MenuIcon.vue";
import {useSideBarStore} from "@/stores/sideBar";
import MoonIcon from "@/components/icons/MoonIcon.vue";
import SunIcon from "@/components/icons/SunIcon.vue";
import {ref, watch} from "vue";
const sideBar = useSideBarStore()
const appStore = useAppStore()
const themeToggler = ref(true)
watch(themeToggler,async (val)=>{
  if(val){
    appStore.theme = 'dark'
  }else{
    appStore.theme = ''
  }
},{immediate:true})
function openSideBar() {
  sideBar.showSideBar = !sideBar.showSideBar
}
</script>

<style scoped>

</style>
