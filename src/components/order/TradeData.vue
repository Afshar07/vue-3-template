





<template>
  <div class="w-full  col-span-12">
    <div class="flex items-center gap-2">
      <div @click="setSlug" class="p-1 cursor-pointer rounded-full bg-primary">
        <ArrowLeftIcon class="fill-white"></ArrowLeftIcon>
      </div>
      <strong class="text-black dark:text-white">Enter Trade Data</strong>
    </div>
    <div class="grid grid-cols-12 gap-2 mt-3">

            <div class="md:col-span-3 col-span-6">
              <small class="text-gray-500 dark:text-white">Time Frame</small>
              <v-select :options="timeFrames" v-model="orderData.timeFrame" label="name"
                        :reduce="(name:any) => name.value"></v-select>
              <small class="text-black dark:text-white text-xs">This Field Is Required</small>
            </div>
            <div class="md:col-span-3 col-span-6">
              <small class="text-gray-500 dark:text-white">Amount</small>
              <VInput :dataType="`text`" v-model="orderData.amount" class=""></VInput>
              <small class="text-black dark:text-white text-xs">This Field Is Required</small>
            </div>
            <div class="md:col-span-3 col-span-6">
              <small class="text-gray-500 dark:text-white">Percentage</small>
              <VInput :dataType="`number`" v-model="orderData.percent" class=""></VInput>
            </div>
            <div class="md:col-span-3 col-span-6">
              <small class="text-gray-500 dark:text-white">Risk Aversion</small>
              <VInput :dataType="`number`" v-model="orderData.riskAversion" class=""></VInput>
            </div>
            <div class="md:col-span-3 col-span-6">
              <small class="text-gray-500 dark:text-white">Length</small>
              <VInput :dataType="`number`" v-model="orderData.length" class=""></VInput>
            </div>

      <div class="col-span-12 border-b border-white my-3">
        <strong class="text-lg text-black dark:text-white">Trade Methods * </strong>
      </div>
      <span class="text-black dark:text-white">Trade Type </span>
      <div class="col-span-12  flex items-end gap-2">
              <button @click="orderData.type=2" :class="{'!bg-red-500 !text-white':orderData.type===2}"
                      class="btn btn border-red-500 text-red-500 bg-none">sell
              </button>
              <button @click="orderData.type=1" :class="{'!bg-green-500 !text-white':orderData.type===1}"
                      class="btn btn border-green-500 text-green-500 bg-none">buy
              </button>
            </div>
            <div class="md:col-span-6 col-span-12">
              <small class="text-gray-500 dark:text-white">Method </small>
              <v-select :options="methods" v-model="orderData.method" label="name"
                        :reduce="(name:any) => name.value"></v-select>
            </div>
      <div class="col-span-12">
        <button @click="sendTradeData" type="button" class="btn bg-primary text-white">submit</button>

      </div>
    </div>


  </div>
</template>

<script setup lang="ts">
import ArrowLeftIcon from "@/components/icons/ArrowLeftIcon.vue";
import {reactive, ref} from "vue";
import VInput from "@/components/utilities/VInput.vue";
import {order} from "@/models/order";
const emits = defineEmits(['sendTradeData','changeSlug'])
const timeFrames = reactive([
  {
    name: '1 MIN',
    value: '1min'
  },
  {
    name: '3 MIN',
    value: '3min'
  },
  {
    name: '5 MIN',
    value: '5min'
  },
  {
    name: '15 MIN',
    value: '15min'
  },
  {
    name: '30 MIN',
    value: '30min'
  },
  {
    name: '1 HOUR',
    value: '1hour'
  },
  {
    name: '2 HOUR',
    value: '2hour'
  },
  {
    name: '4 HOUR',
    value: '4hour'
  },
  {
    name: '8 HOUR',
    value: '8hour'
  },
  {
    name: '12 HOUR',
    value: '12hour'
  },
  {
    name: '1 DAY',
    value: '1day'
  },
  {
    name: '1 WEEK',
    value: '1week'
  },
])
const methods = reactive([
  {
    name: 'open',
    value: 1
  },
  {
    name: 'close',
    value: 2
  },
  {
    name: 'high',
    value: 3
  },
  {
    name: 'low',
    value: 4
  },
  {
    name: 'high low',
    value: 5
  },
  {
    name: 'open close',
    value: 6
  },
  {
    name: 'high low open close',
    value: 7
  },
])

const orderData = reactive({
  type: 0,
  percent: null,
  amount: "",
  riskAversion: null,
  length: null,
  timeFrame: "",
  method: null,
})

function sendTradeData(){
  emits('sendTradeData',orderData)
}

function setSlug(){
  emits('changeSlug','SelectMarket')

}
</script>

<style scoped>

</style>