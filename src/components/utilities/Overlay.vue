<template>
  <div v-if="showLoadingOverlay" class="z-[99999] w-full fixed min-h-full flex items-center justify-center" style="background: rgba(0,0,0,0.5)">
    <div class="code-loader">
      <span>{</span><span>}</span>
    </div>
  </div>
</template>

<script setup>
import {computed} from "vue";
import {useAppStore} from "@/stores/app";
const appStore = useAppStore()
const showLoadingOverlay = computed(()=>{
  return appStore.getOverlayState
})
</script>

<style scoped>
.code-loader {
  color: #fff;
  font-family: Consolas, Menlo, Monaco, monospace;
  font-weight: bold;
  font-size: 100px;
  opacity: 0.8;
}

.code-loader span {
  display: inline-block;
  animation: pulse_414 0.4s alternate infinite ease-in-out;
}

.code-loader span:nth-child(odd) {
  animation-delay: 0.4s;
}

@keyframes pulse_414 {
  to {
    transform: scale(0.8);
    opacity: 0.5;
  }
}
</style>