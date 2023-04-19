<template>
  <transition name="SlideUp" appear>
    <div v-if="show" class="fixed top-10   w-full  sm:px-[10%] md:px-[20%] lg:px-[30%] xl:px-[40%]  z-[9999] p-4">
      <div :class="{'!bg-green-500':icon==='check','!bg-red-500':icon==='alert',}" class=" w-full  shadow-lg dark:bg-slate-500 rounded-xl shadow p-3">
        <div class="flex items-center justify-between py-2 border-b-1">
          <p class="dark:text-white" style="overflow-wrap: anywhere">
            {{content}}
          </p>
          <div @click="closeToast" class="p-2  rounded-full">
            <CloseIcon :class="{'!fill-green-500':icon==='check','!fill-red-500':icon==='alert',}" class=" bg-white rounded-full cursor-pointer"></CloseIcon>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script setup lang="ts">
import {computed, ref, watch} from "vue";
import CheckIcon from "../icons/CheckIcon.vue";
import ErrorIcon from "../icons/ErrorIcon.vue";
import CloseIcon from "../icons/CloseIcon.vue";
import {useToastStore} from "@/stores/toast";
let toastStore = useToastStore()
const notifier = ref(null)
let content = ref('')
let title = ref('')
let icon = ref('CheckIcon')
let show = ref(false)
function closeToast(){
      show.value = false
  toastStore.showToast = false
  //@ts-ignore
      clearTimeout(notifier.value)
}
const getToastStoreState = computed(()=>{
  return toastStore.getToast
})

watch(getToastStoreState,async ()=>{
  if(!show){
    //@ts-ignore
    clearTimeout(notifier.value)
        }
        show.value = true;
        content.value = toastStore.toastData.content;
        title.value = toastStore.toastData.title;
        icon.value = toastStore.toastData.icon
// @ts-ignore
        notifier.value =  setTimeout(()=>{
          show.value = false
          toastStore.showToast = false

        },2000)
},)

</script>

<style scoped>
.CustomWidth{
  @apply w-1/2 !important;
}
.SlideUp-enter-active{
  animation: SlideUpAnm 0.5s ease-in-out;

}

.SlideUp-leave-active{
  animation: SlideUpAnm reverse 0.5s ease-in-out;

}
@keyframes SlideUpAnm {
  0%{
    opacity: 0;
    transform: translateY(-100%);
  }
  100%{
    opacity: 1;
    transform: translateY(0);
  }
}

</style>
