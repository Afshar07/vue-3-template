<template>
    <div v-if="toastData.show && toastData.variant==='success'"
         class="fixed top-10  flex justify-end  w-full    z-[9999] py-4 md:px-10 px-5">
      <div class=" !bg-green-500 relative overflow-x-hidden  shadow-lg dark:bg-slate-500 rounded-xl shadow p-3 ">
        <div class="flex items-center justify-between py-2 border-b-1">
          <div class="p-2  rounded-full">
            <component class="mr-2 fill-white" :is="toastIcons[toastStore.toastData.icon]"></component>
          </div>
          <p class="dark:text-white mt-1" style="overflow-wrap: anywhere">
            {{ toastData.content }}
          </p>
          <div @click="closeToast">
            <XIcon class=" w-5 h-5 ml-2 fill-white rounded-full opacity-50 hover:opacity-100  cursor-pointer"></XIcon>
          </div>
        </div>
        <div class="left-0 bottom-0 absolute bg-white h-1 transition-all " :style="`width:${dynamicWidth}%`"></div>
      </div>
    </div>
    <div v-if="toastData.show && toastData.variant==='error'"
         class="fixed top-10  flex justify-end  w-full    z-[9999] py-4 md:px-10 px-5">
      <div class=" !bg-red-500 relative overflow-x-hidden  shadow-lg dark:bg-slate-500 rounded-xl shadow p-3 ">
        <div class="flex items-center justify-between py-2 border-b-1">
          <div class="p-2  rounded-full">
            <component class="mr-2 fill-white" :is="toastIcons[toastStore.toastData.icon]"></component>
          </div>
          <p class="dark:text-white mt-1" style="overflow-wrap: anywhere">
            {{ toastData.content }}
          </p>
          <div @click="closeToast">
            <XIcon class=" w-5 h-5 ml-2 fill-white rounded-full opacity-50 hover:opacity-100  cursor-pointer"></XIcon>
          </div>
        </div>
        <div class="left-0 bottom-0 absolute bg-white h-1 transition-all " :style="`width:${dynamicWidth}%`"></div>
      </div>
    </div>

</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref, watch} from "vue";
import CheckIcon from "../icons/CheckIcon.vue";
import CloseIcon from "../icons/CloseIcon.vue";
import {useToastStore} from "@/stores/toast";
import XIcon from "@/components/icons/XIcon.vue";

let toastStore = useToastStore()
const notifier = ref(null)
let toastData = reactive({
  content: '',
  icon: '',
  show: false,
  variant: ''
})
const toastIcons = {
  CheckIcon,
  CloseIcon,
  XIcon
}

function closeToast() {
  toastData.show = false
  toastStore.showToast = false
  //@ts-ignore
  clearTimeout(notifier.value)
}

let progressWidth = ref<number>(0)
let progressInterval = ref<any>(0)

let dynamicWidth = computed(() => {
  let num: any = ref(0)
  if (progressWidth.value < 100) {

  progressInterval = setInterval((): number => {

      progressWidth.value += 1
      num.value = progressWidth.value
  }, 500)
  return progressWidth.value
  }else{
    clearInterval(progressInterval)
    return progressWidth.value
  }


})
const getToastStoreState = computed(() => {
  return toastStore.getToast
})
watch(getToastStoreState, async (val) => {
  toastData.show = true;
  toastData.content = toastStore.toastData.content;
  toastData.variant = toastStore.toastData.variant

//   if (toastData.show) {
//     //@ts-ignore
//     clearTimeout(notifier.value)
//   } else {
//     toastData.show = true;
//     toastData.content = toastStore.toastData.content;
//     toastData.variant = toastStore.toastData.variant
// // @ts-ignore
//     notifier.value = setTimeout(() => {
//       toastData.show = false
//       toastStore.showToast = false
//       toastData.variant = ''
//       console.log(toastData.show)
//     }, 5000)
//   }
},{immediate:true})


</script>

<style scoped>
.CustomWidth {
  @apply w-1/2 !important;
}

</style>
