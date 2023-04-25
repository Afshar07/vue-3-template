<template>
  <transition name="slide-right" appear>
    <div v-if="showToast"
         class="fixed top-10 flex justify-end w-full z-[9999] py-4 md:px-10 px-5">

      <div :class="{'!bg-green-500':toastData.variant==='success','!bg-red-500 ':toastData.variant==='error'}"
           class=" relative overflow-x-hidden shadow-lg dark:bg-slate-500 rounded-xl shadow p-3 ">
        <div class="flex items-center justify-between py-2 border-b-1">
          <div class="p-2 rounded-full">
            <component class="mr-2 fill-white" :is="dynamicIconInstance"></component>
          </div>
          <p class="dark:text-white mt-1" style="overflow-wrap: anywhere">
            {{ toastData.content }}
          </p>
          <div @click="closeToast">
            <XIcon class=" w-5 h-5 ml-2 fill-white rounded-full opacity-50 hover:opacity-100  cursor-pointer"></XIcon>
          </div>
        </div>
<!--              <div class="left-0 bottom-0 absolute bg-white h-1" :style="`width:${dynamicWidth}%`"></div>-->
      </div>
    </div>
  </transition>


</template>


<script setup lang="ts">
import {computed, onMounted, reactive, ref, watch} from "vue";
import CheckIcon from "../icons/CheckIcon.vue";
import CloseIcon from "../icons/CloseIcon.vue";
import {useToastStore} from "@/stores/toast";
import XIcon from "@/components/icons/XIcon.vue";

let toastStore = useToastStore();
const toastIcons = {
  CheckIcon,
  CloseIcon,
  XIcon
};
let dynamicIconInstance = computed((): any => {
  switch (toastData.variant) {
    case 'success':
      return toastIcons['CheckIcon']
      break;
    case 'error':
      return toastIcons['CloseIcon']
      break;

  }
})
let content = ref('')
let showToast = ref(false)
let toastTimer = ref<any>(null)
let toastData = reactive({
  variant: '',
  content: ''
})
//
// let progressWidth = ref<number>(0);
// let progressInterval = ref<any>(0);
//
// let dynamicWidth = computed(() => {
//
//   let num: any = ref(0)
//
//   if (progressWidth.value < 100) {
//     progressInterval = setInterval((): any => {
//       progressWidth.value += .5
//       num.value = progressWidth.value;
//     }, 650);
//     return progressWidth.value;
//   } else {
//     clearInterval(progressInterval);
//     return progressWidth.value
//   }
// })

function closeToast() {
  showToast.value = false
  toastStore.clearToastData()
  clearTimeout(toastTimer)
  //@ts-ignore
};


onMounted(() => {
  toastStore.$onAction(({name}) => {
    switch (name) {
      case 'success':
        toastData.variant = 'success'
        showToast.value = true
        toastTimer.value = setTimeout(() => {
          showToast.value = false
          toastStore.clearToastData()
          clearTimeout(toastTimer.value)
        }, 5000)
        break;
      case 'error':
        toastData.variant = 'error'
        showToast.value = true

        toastTimer.value = setTimeout(() => {
          showToast.value = false
          clearTimeout(toastTimer.value)
          toastStore.clearToastData()
        }, 5000)
        break;
    }
  })
  toastStore.$subscribe((mutation, state) => {
    toastData.content = state.toastData.content
  })
})


</script>

<style scoped>
.CustomWidth {
  @apply w-1/2 !important;
}

</style>
