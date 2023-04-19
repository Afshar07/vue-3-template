<template>
  <div class=" min-h-full w-full grid grid-cols-12">
    <div class="md:col-span-2 col-span-12">
      <side-bar></side-bar>
    </div>
    <div class="md:col-span-10 p-5 col-span-12 z-[1]">
      <Header></Header>
      <div class="bg-white dark:bg-dark-muted rounded-xl shadow grid grid-cols-12  gap-3 p-5 ">
        <!--        <div class="stats bg-white dark:bg-slate-600 text-black dark:text-white col-span-12 shadow">-->
        <!--          <div class="stat">-->
        <!--            <div class="stat-figure text-secondary">-->
        <!--              <CoinexIcon></CoinexIcon>-->
        <!--            </div>-->
        <!--            <div class="stat-title text-black dark:text-white ">Coinex Wallet Amount</div>-->
        <!--            <div class="stat-value">10000USDT</div>-->
        <!--          </div>-->

        <!--          <div class="stat">-->
        <!--            <div class="stat-figure text-secondary">-->
        <!--              <KuCoinIcon></KuCoinIcon>-->
        <!--            </div>-->
        <!--            <div class="stat-title text-black dark:text-white">KuCoin Wallet Amount</div>-->
        <!--            <div class="stat-value">10000USDT</div>-->
        <!--          </div>-->

        <!--          <div class="stat">-->
        <!--            <div class="stat-figure text-secondary">-->
        <!--              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"-->
        <!--                   class="inline-block w-8 h-8 stroke-current">-->
        <!--                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"-->
        <!--                      d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>-->
        <!--              </svg>-->
        <!--            </div>-->
        <!--            <div class="stat-title text-black dark:text-white">total Wallet Amount</div>-->
        <!--            <div class="stat-value">10000USDT</div>-->
        <!--          </div>-->

        <!--        </div>-->
        <component :exchangeId="orderData.exchange" :is="componentInstance" @sendSelectedExchange="setSelectedExchange"
                   @sendProfit="setProfit"
                 @sendSelectedCryptoAccountId="setCryptoId"  @changeSlug="setSelectedSlug" @sendSelectedMarket="setSelectedMarket" @sendTradeData="setTradeData"></component>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from "../../components/main/sideBar.vue";
import Header from "@/components/main/Header.vue";
import Running from "@/components/utilities/Running.vue";
import CoinexIcon from "@/components/icons/CoinexIcon.vue";
import KuCoinIcon from "@/components/icons/KuCoinIcon.vue";
import {order} from "@/models/order";
import {computed, inject, reactive, ref} from "vue";
import VInput from "@/components/utilities/VInput.vue";
import {useAuthStore} from "@/stores/auth";
import {useToastStore} from "@/stores/toast";
import {SignErrors} from "@/models/signErrors";
import {useAppStore} from "@/stores/app";
import {useRouter} from "vue-router";
import SelectExchange from "@/components/order/SelectExchange.vue";
import SelectMarket from "@/components/order/SelectMarket.vue";
import TradeData from "@/components/order/TradeData.vue";
import SelectApiKey from "@/components/order/SelectApiKey.vue";
import ProfitType from "@/components/order/ProfitType.vue";

const toastStore = useToastStore()
const authStore = useAuthStore()
const appStore = useAppStore()
const api: any = inject('repositories')
const router = useRouter()
const orderData = reactive<order>({
  createDate: new Date(Date.now()),
  exchange: null,
  market: "",
  type: 0,
  percent: 0,
  amount: "",
  cryptoAccountId:0,
  riskAversion: 0,
  length: 0,
  profit:null,
  timeFrame: "",
  method: null,
})
const slugs: any = {
  SelectExchange,
  SelectMarket,
  TradeData,
  ProfitType,
  SelectApiKey
}
let selectedSlug = ref('SelectExchange')
let componentInstance = computed(() => {
  return slugs[selectedSlug.value]
})
function setTradeData(tradeData:Object){
  Object.keys(tradeData).forEach(key => {
    //@ts-ignore
    orderData[key] = tradeData[key]
  })
  createOrder()
}
function setProfit(profit:number|null){
  if(profit){
    orderData.profit = profit
  }else{
orderData.profit = 0
}
}
function setCryptoId(cryptoId:number) {
  orderData.cryptoAccountId = cryptoId
}
function setSelectedExchange(exchangeType: number) {
  orderData.exchange = exchangeType
}
function setSelectedMarket(market:string){
  orderData.market = market.toUpperCase()
}
function setSelectedSlug(slug: string) {
  selectedSlug.value = slug
}

async function createOrder() {
  if (orderData.exchange &&
      orderData.market !== '' &&
      orderData.type !== 0 &&
      orderData.amount !== "" &&
      orderData.timeFrame !== "" &&
      orderData.method) {
    try {
      appStore.showOverlay = true
      const res = await api.createOrder.setPayload(orderData)
      toastStore.showToast = true
      toastStore.toastData = {
        title: 'Succeed',
        content: 'Order Created',
        icon: 'check'
      }
      await router.push('/dashboard/MyOrders')
    } catch (e) {
      console.log(e)
    } finally {
      appStore.showOverlay = false
    }
  } else if(orderData.riskAversion<=0){
     toastStore.showToast = true
    toastStore.toastData = {
      title: 'Failed',
      content: 'insufficient risk percent',
      icon: 'alert'
    }

    }else{
    toastStore.showToast = true
    toastStore.toastData = {
      title: 'Failed',
      content: 'Please Fill In All The Fields',
      icon: 'alert'
    }
  }
}

</script>

<style scoped>

</style>
