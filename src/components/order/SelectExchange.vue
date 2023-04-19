<template>
  <div class="w-full  col-span-12">
    <strong class="text-black  dark:text-white">Select Your Prefered Exchange</strong>
    <div class="flex items-center md:mt-0 mt-3 md:flex-row flex-col  gap-4 justify-center  w-full">
      <div @click="setExchange(2)"
           class="w-60 h-40 cursor-pointer transform hover:scale-110 transition-all rounded-xl shadow flex justify-center bg-slate-600 items-center gap-2">
        <CoinexIcon class="w-14 h-14"></CoinexIcon>
        <span class="text-black text-2xl dark:text-white">Coinex</span>
      </div>
      <div @click="setExchange(1)"
           class="w-60 h-40 cursor-pointer transform hover:scale-110 transition-all rounded-xl shadow flex justify-center bg-slate-600 items-center gap-2">
        <KuCoinIcon class="w-14 h-14"></KuCoinIcon>
        <span class="text-black text-2xl dark:text-white">KuCoin</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import CoinexIcon from "@/components/icons/CoinexIcon.vue";
import KuCoinIcon from "@/components/icons/KuCoinIcon.vue";

const emits = defineEmits(['sendSelectedExchange', 'changeSlug'])

function setExchange(exchangeType) {
  emits('sendSelectedExchange', exchangeType)
  emits('changeSlug', 'SelectApiKey')
}
</script>

<style scoped>

</style>