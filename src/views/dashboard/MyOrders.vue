<template>
  <div class=" min-h-full w-full grid grid-cols-12">
    <input type="checkbox" id="changeOrderStatus" ref="changeOrderStatus" class="modal-toggle"/>
    <div class="modal ">
      <label for="" style="direction: ltr!important;" class="modal-box bg-white dark:bg-dark-muted">
        <div class="w-full  ">
          <strong class="font-bold text-lg text-black dark:text-white ">Change Order Status</strong>
          <div class="w-full">
            <v-select :options="orderStatuses" v-model="selectedOrderStatus" label="name"
                      :reduce="(name:any) => name.value"></v-select>
          </div>
        </div>
        <div class="modal-action !justify-start">
          <label  for="changeOrderStatus" class="btn bg-green-500 text-white" @click="changeOrderStatus">submit</label>
          <label  for="changeOrderStatus" class="btn bg-red-500 text-white">close</label>
        </div>
      </label>
    </div>
    <div class="col-span-12 z-[1]">
      <div class="bg-white dark:bg-dark-muted rounded-xl shadow grid grid-cols-12  gap-3 p-5 ">

        <div class="col-span-12 grid grid-cols-12 flex items-center gap-2">
          <div class="md:col-span-2 col-span-12 flex flex-col justify-center">
            <small class="text-black dark:text-white">Order Type</small>
            <v-select :options="tradeTypes" v-model="filters.tradeType" label="name"
                      :reduce="(name:any) => name.value"></v-select>
          </div>
          <div class="md:col-span-2 col-span-12 md:my-0 my-3 flex flex-col justify-center">
            <small class="text-black dark:text-white">Exchange</small>
            <v-select :options="exchanges" v-model="filters.exchange" label="name"
                      :reduce="(name:any) => name.value"></v-select>
          </div>
          <div class="md:col-span-2 col-span-12 flex flex-col justify-center">
            <small class="text-black dark:text-white">Order status</small>
            <v-select :options="orderStatuses" v-model="filters.status" label="name"
                      :reduce="(name:any) => name.value"></v-select>
          </div>
        </div>
        <div class="overflow-x-auto w-full col-span-12">
          <table class="table table-compact  w-full">
            <!-- head -->
            <thead>
            <tr>

              <th>time Frame</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Percent</th>
              <th>Risk</th>
              <th>Market</th>
              <th>exchange</th>
              <th>Method</th>
              <th>blockchainOrderId</th>
              <th>mainOrderPrice</th>
              <th>updated</th>
              <th>status</th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <!-- row 1 -->

            <tr v-for="(item,idx) in orders.ordersList" :key="idx">

              <td>
                <small>{{ item['timeFrame'] }}</small>
              </td>
              <td>
                <small v-if="item['type']===1" class=" py-1 px-3  rounded-full bg-green-500 text-white">BUY</small>
                <small v-if="item['type']===2" class=" py-1 px-3  rounded-full bg-red-500 text-white">SELL</small>
              </td>
              <td>
                <small>{{ item['amount'] }}</small>
              </td>
              <td>
                <small>{{ item['percent'] }}%</small>
              </td>
              <td>
                <small>{{ item['riskAversion'] }}%</small>
              </td>
              <td>
                <small>{{ item['market'] }}</small>
              </td>
              <td>
                <CoinexIcon v-if="item['exchange'] === 2" class="w-5 h-5"></CoinexIcon>
                <KuCoinIcon v-if="item['exchange'] === 1" class="w-8 h-8"></KuCoinIcon>
              </td>
              <td>
                <small>{{ methods[item['method']].name }}</small>
              </td>
              <td>
                <small>{{ item['blockchainOrderId']}}</small>
              </td>
              <td>
                <small>{{item['mainOrderPrice']}}</small>
              </td>
              <td>
                <div v-if="item['updateDate']" class="flex flex-col items-center justify-center">
                <small>{{ new Date(item['updateDate']).toLocaleDateString()}}</small>
                <small>{{ new Date(item['updateDate']).toLocaleTimeString()}}</small>
                </div>
                 <small v-else>-</small>
              </td>
              <td>
                <div v-if="item['status'] ===1" class="tooltip" data-tip="Active">
                  <Running></Running>
                </div>
                <div v-if="item['status'] ===4" class="tooltip" data-tip="Ended">
                  <StopIcon class="w-8 h-8 fill-red-500"></StopIcon>
                </div>
                <div v-if="item['status'] ===3" class="tooltip" data-tip="Canceled">
                  <CancelIcon class="w-8 h-8 fill-red-500"></CancelIcon>
                </div>
                <div v-if="item['status'] ===2" class="tooltip" data-tip="Paused">
                  <PauseIcon class="w-8 h-8 fill-gray-300"></PauseIcon>
                </div>
                <div v-if="item['status'] ===5"  class="tooltip" data-tip="Paused">
                  <ReverseIcon class="w-7 h-7 stroke-gray-300"></ReverseIcon>
                </div>
              </td>
              <td>
                <button @click="selectedOrder = item" type="button"
                        class="btn btn-sm border-none cursor-pointer text-white  bg-primary">
                  <label class="cursor-pointer" for="changeOrderStatus">
                    change status
                  </label>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
        <div v-if="totalPages.length>1"  class="col-span-12 mt-3">
          <Pagination :activePage="selectedPageId" :totalPages="totalPages" @PageChanged="changePage($event)"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideBar from "../../components/main/sideBar.vue";
import Header from "@/components/main/Header.vue";
import Running from "@/components/utilities/Running.vue";
import {useAppStore} from "@/stores/app";
import {inject, nextTick, onActivated, onMounted, reactive, ref, watch} from "vue";
import StopIcon from "@/components/icons/StopIcon.vue";
import CancelIcon from "@/components/icons/CancelIcon.vue";
import PauseIcon from "@/components/icons/PauseIcon.vue";
import Pagination from "@/components/utilities/Pagination.vue";
import {useToastStore} from "@/stores/toast";
import CoinexIcon from "@/components/icons/CoinexIcon.vue";
import KuCoinIcon from "@/components/icons/KuCoinIcon.vue";
import ReverseIcon from "@/components/icons/ReverseIcon.vue";
const toastStore = useToastStore()
const appStore = useAppStore()
const api: any = inject('repositories')
let selectedPageId = ref(1)
let totalPages = ref<any>([])
const methods = reactive([
  // this item is extra to prevent index Errors
  {
    name: 'o222pen',
    value: 0
  },
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

let selectedOrder:any = ref(null)
let selectedOrderStatus = ref(null)
let orders = reactive({
  ordersList:null
})
let orderIds = reactive({
  selectedOrderIds:[]
})
let orderStatuses = reactive([
  {
    name: 'Running',
    value: 1
  },
  {
    name: 'Cancel',
    value: 3
  }
])
let tradeTypes = reactive([
  {
    name: 'Buy',
    value: 1
  },
  {
    name: 'Sell',
    value: 2
  },
])
let exchanges = reactive([
  {
    name: 'KuCoin',
    value: 1
  },
  {
    name: 'Coinex',
    value: 2
  },
])
let filters = reactive({
  status: null,
  exchange: null,
  tradeType: null
})


onMounted(()=>{
  getAllOrderByUserId()
})

watch(filters,async (val)=>{
  getAllOrderByUserId()
},{deep:true})

function  changePage(id:number){
  selectedPageId.value = id
  getAllOrderByUserId()
}
async function changeOrderStatus(){
  try {
    appStore.showOverlay = true
    const res = await api.changeOrderStatus.setParams({
      orderId:selectedOrder.value.orderId,
      status:selectedOrderStatus.value
    })
    toastStore.showToast = true
    toastStore.toastData = {
      title: 'Succeed',
      content: 'Order Status Changed',
      icon: 'check'
    }
    await  getAllOrderByUserId()
  }catch (e) {
    console.log(e)
  }finally {
    appStore.showOverlay = false
  }
}
async function getAllOrderByUserId() {
  try {
    appStore.showOverlay = true
    const res = await api.getAllOrderByUserId.setParams({
      pageNumber: selectedPageId.value,
      count: 10,
      status:filters.status,
      exchange:filters.exchange,
      tradeType:filters.tradeType
    })
    totalPages.value = []
    const result = Math.ceil(res.data.ordersCount / 10)
    for (let i = 1; i <= result; i++) {
      totalPages.value.push(i);
    }
    orders.ordersList = res.data.orders

  } catch (e) {
    console.log(e)
  } finally {
    appStore.showOverlay = false
  }
}
</script>

<style scoped>
.table thead th {
  @apply dark:bg-slate-600;
  @apply dark:text-white;
}

.table tbody td {
  @apply dark:bg-slate-500;
  @apply dark:text-white;
}
</style>
