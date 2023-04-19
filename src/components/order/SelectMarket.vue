<template>
  <div class="w-full  col-span-12">
    <div class="flex items-center gap-2">
      <div @click="setSlug" class="p-1 cursor-pointer rounded-full bg-primary">
      <ArrowLeftIcon class="fill-white"></ArrowLeftIcon>
      </div>
    <strong class="text-black dark:text-white">Select Market</strong>
    </div>
    <div class="w-full grid grid-cols-10 gap-2 mt-3">
    <div @click="setSelectedMarket('BTC')" class="md:col-span-2 col-span-10 p-5 cursor-pointer transform hover:scale-110 transition-all rounded-xl shadow flex justify-center bg-slate-600 items-center gap-2">
      <img src="../../assets/image/coins/bitcoin.png" class="object-contain w-6 h-6" alt="">
      <span class="text-black dark:text-white">BitCoin (BTC)</span>
    </div>
      <div @click="setSelectedMarket('ETH')" class="md:col-span-2 col-span-10 p-5 cursor-pointer transform hover:scale-110 transition-all rounded-xl shadow flex justify-center bg-slate-600 items-center gap-2">
        <img src="../../assets/image/coins/ethereum.png" class="object-contain w-6 h-6" alt="">
        <span class="text-black dark:text-white">Ethereum (ETH)</span>
      </div>
      <div @click="setSelectedMarket('USDT')" class="md:col-span-2 col-span-10 p-5 cursor-pointer transform hover:scale-110 transition-all rounded-xl shadow flex justify-center bg-slate-600 items-center gap-2">
        <img src="../../assets/image/coins/tether.png" class="object-contain w-6 h-6" alt="">
        <span class="text-black dark:text-white">Tether (USDT)</span>
      </div>
      <div @click="setSelectedMarket('BNB')" class="md:col-span-2 col-span-10 p-5 cursor-pointer transform hover:scale-110 transition-all rounded-xl shadow flex justify-center bg-slate-600 items-center gap-2">
        <img src="../../assets/image/coins/bnb.png" class="object-contain w-6 h-6" alt="">
        <span class="text-black dark:text-white">Binance Coin (BNB)</span>
      </div>
      <div @click="setSelectedMarket('USDC')" class="md:col-span-2 col-span-10 p-5 cursor-pointer transform hover:scale-110 transition-all rounded-xl shadow flex justify-center bg-slate-600 items-center gap-2">
        <img src="../../assets/image/coins/usd-coin.png" class="object-contain w-6 h-6" alt="">
        <span class="text-black dark:text-white">USD-coin (USDC)</span>
      </div>
      <div @click="setSelectedMarket('XRP')" class="md:col-span-2 col-span-10 p-5 cursor-pointer transform hover:scale-110 transition-all rounded-xl shadow flex justify-center bg-slate-600 items-center gap-2">
        <img src="../../assets/image/coins/xrp.png" class="object-contain w-6 h-6" alt="">
        <span class="text-black dark:text-white">XRP (XRP)</span>
      </div>
      <div @click="setSelectedMarket('ADA')" class="md:col-span-2 col-span-10 p-5 cursor-pointer transform hover:scale-110 transition-all rounded-xl shadow flex justify-center bg-slate-600 items-center gap-2">
        <img src="../../assets/image/coins/cardano.png" class="object-contain w-6 h-6" alt="">
        <span class="text-black dark:text-white">Cardano (ADA)</span>
      </div>
      <div @click="setSelectedMarket('DOGE')" class="md:col-span-2 col-span-10 p-5 cursor-pointer transform hover:scale-110 transition-all rounded-xl shadow flex justify-center bg-slate-600 items-center gap-2">
        <img src="../../assets/image/coins/dogecoin.png" class="object-contain w-6 h-6" alt="">
        <span class="text-black dark:text-white">Dogecoin (DOGE)</span>
      </div>
      <div @click="setSelectedMarket('MATIC')" class="md:col-span-2 col-span-10 p-5 cursor-pointer transform hover:scale-110 transition-all rounded-xl shadow flex justify-center bg-slate-600 items-center gap-2">
        <img src="../../assets/image/coins/polygon.png" class="object-contain w-6 h-6" alt="">
        <span class="text-black dark:text-white">Polygon (MATIC)</span>
      </div>
      <div @click="setSelectedMarket('SOL')" class="md:col-span-2 col-span-10 p-5 cursor-pointer transform hover:scale-110 transition-all rounded-xl shadow flex justify-center bg-slate-600 items-center gap-2">
        <img src="../../assets/image/coins/solana.png" class="object-contain w-6 h-6" alt="">
        <span class="text-black dark:text-white">Solana (SOL)</span>
      </div>
    </div>
      <div class="text-center text-black dark:text-white my-3">Or</div>
            <div class="flex flex-col items-center justify-center">
              <small class="text-gray-500 dark:text-white">Market Symbol (ex:BTC)</small>
              <div class="flex items-center gap-2 mt-3 ">
                        <VInput :dataType="`text`" v-model="symbol" class=""></VInput>
                <button @click="setSelectedMarket(symbol)" v-if="symbol!==''" class="btn bg-primary btn-sm text-white "> next</button>
              </div>
            </div>
  </div>
</template>

<script setup>
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon.vue";
import {reactive, ref} from "vue";
import VInput from "@/components/utilities/VInput.vue";
const emits = defineEmits(['sendSelectedMarket','changeSlug'])
let symbol = ref('')
let coins = reactive([
  {
    name:'Bitcoin (BTC)',
    img:  'bitcoin.png',
    symbol:'BTC'
  },
  {
    name:'Ethereum (ETH)',
    img:'../../assets/image/coins/ethereum.png',
    symbol:'ETH'
  },
  {
    name:'Tether (USDT)',
    img:'../../assets/image/coins/tether.png',
    symbol:'USDT'
  },
  {
    name:'Binance Coin (BNB)',
    img:'../../assets/image/coins/bnb.png',
    symbol:'BNB'
  },
  {
    name:'USD Coin (USDC)',
    img:'../../assets/image/coins/usd-coin.png',
    symbol:'USDC'
  },
  {
    name:'XRP (XRP)',
    img:'../../assets/image/coins/xrp.png',
    symbol:'XRP'
  },
  {
    name:'Cardano (ADA)',
    img:'../../assets/image/coins/cardano.png',
    symbol:'ADA'
  },
  {
    name:'Dogecoin (DOGE)',
    img:'../../assets/image/coins/dogecoin.png',
    symbol:'DOGE'
  },
  {
    name:'Polygon (MATIC)',
    img:'../../assets/image/coins/polygon.png',
    symbol:'MATIC'
  },
  {
    name:'Solana (SOL)',
    img:'../../assets/image/coins/solana.png',
    symbol:'SOL'
  },

])
function setSelectedMarket(market){
  emits('sendSelectedMarket',market)
  emits('changeSlug','TradeData')

}

function setSlug(){
  emits('changeSlug','SelectApiKey')

}
</script>

<style scoped>

</style>