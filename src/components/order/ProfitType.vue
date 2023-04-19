<template>
  <div class="w-full  col-span-12">
    <div class="flex items-center gap-2">
      <div @click="setSlug" class="p-1 cursor-pointer rounded-full bg-primary">
        <ArrowLEftIcon class="fill-white"></ArrowLEftIcon>
      </div>
      <strong class="text-black  dark:text-white">Select Profit Type</strong>
    </div>
    <div class="flex items-center md:mt-0 mt-3 md:flex-row flex-col  gap-4 justify-center  w-full">
      <div @click="profitType= 1" :class="{'border border-primary': profitType===1}"
           class="w-60 h-40 cursor-pointer transform hover:scale-110 transition-all rounded-xl shadow flex justify-center bg-slate-600 items-center gap-2">
        <span class="text-black text-2xl dark:text-white">Single fisher</span>
      </div>
      <div @click="profitType= 2" :class="{'border border-primary': profitType===2}"
           class="w-60 h-40 cursor-pointer transform hover:scale-110 transition-all rounded-xl shadow flex justify-center bg-slate-600 items-center gap-2">
        <span class="text-black text-2xl dark:text-white">Continuous fisher</span>
      </div>
    </div>
    <div v-if="profitType===2" class="w-full  transition-all flex items-center justify-center mt-5">
      <div class="flex flex-col items-center justify-center">
        <small class="text-gray-500 dark:text-white">Profit Amount</small>
        <div class="flex items-center gap-2 mt-3 ">
          <VInput :dataType="`number`" v-model="profitAmount" class=""></VInput>
          <button @click="setProfit(profitAmount)" v-if="profitAmount" class="btn bg-primary btn-sm text-white "> next</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CoinexIcon from "@/components/icons/CoinexIcon.vue";
import KuCoinIcon from "@/components/icons/KuCoinIcon.vue";
import {defineEmits, inject, onMounted, reactive, ref, watch} from "vue";
import {useAppStore} from "@/stores/app";
import ArrowLEftIcon from "@/components/icons/ArrowLeftIcon.vue";
import VInput from "@/components/utilities/VInput.vue";
const emits = defineEmits(['sendProfit','changeSlug'])
let profitType = ref(0)
let profitAmount = ref(null)

watch(profitType,async (val)=>{
  if(val===1){
    setProfit(profitAmount.value)
  }
})

function setSlug(){
  emits('changeSlug','SelectExchange')

}


function setProfit(profit){
  emits('sendProfit',profit)
  emits('changeSlug','SelectMarket')
}
</script>

<style scoped>

</style>