<template>
  <div class="w-full  col-span-12">
    <div class="flex items-center gap-2">
      <div @click="setSlug" class="p-1 cursor-pointer rounded-full bg-primary">
        <ArrowLEftIcon class="fill-white"></ArrowLEftIcon>
      </div>
      <strong class="text-black  dark:text-white">Select Your Api Key</strong>
    </div>
    <div class="flex items-center  my-3 md:flex-row flex-col  gap-4   w-full">
      <div class="col-span-12 md:w-8/12 w-full">
        <small class="text-gray-500 dark:text-white">Search by Api Key Name</small>
        <div class="flex items-center gap-2">
          <v-select  class="md:w-6/12 w-full" :options="apiKey?.apiKeys" v-model="selectedCryptoAccountId" label="name"
                  :reduce="(name) => name.cryptoAccountId"></v-select>
        <button v-if="selectedCryptoAccountId" type="button" class="btn btn-sm border-none bg-primary text-white" @click="setCryptoId(selectedCryptoAccountId)">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import CoinexIcon from "@/components/icons/CoinexIcon.vue";
import KuCoinIcon from "@/components/icons/KuCoinIcon.vue";
import {defineEmits, inject, onMounted, reactive, ref} from "vue";
import {useAppStore} from "@/stores/app";
import ArrowLEftIcon from "@/components/icons/ArrowLeftIcon.vue";
const emits = defineEmits(['sendSelectedCryptoAccountId','changeSlug'])
const props = defineProps(['exchangeId'])
const appStore  = useAppStore()
const api = inject('repositories')

const selectedCryptoAccountId = ref(null)
let apiKey = reactive({
  apiKeys:[]
})
onMounted(()=>{
  getCryptoAccounts()
})
async function getCryptoAccounts() {
  try {
    appStore.showOverlay = true
    const res = await api.getCryptoAccountsByUserId.setParams({
      pageNumber: 0,
      count: 0,
      exchange: props.exchangeId
    })
    apiKey.apiKeys = res.data.accounts
  } catch (e) {
    console.log(e)
  } finally {
    appStore.showOverlay = false
  }
}
function setSlug(){
  emits('changeSlug','SelectExchange')

}


function setCryptoId(cryptoId){
  emits('sendSelectedCryptoAccountId',cryptoId)
  emits('changeSlug','ProfitType')
}
</script>

<style scoped>

</style>